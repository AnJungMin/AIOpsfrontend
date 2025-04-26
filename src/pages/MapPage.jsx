import { useEffect } from "react";

export default function MapPage() {
  useEffect(() => {
    if (!window.kakao || !window.kakao.maps) {
      console.error("카카오맵 스크립트가 로드되지 않았습니다.");
      return;
    }

    const mapContainer = document.getElementById("map");
    const mapOption = {
      center: new window.kakao.maps.LatLng(37.5665, 126.9780), // 서울시청
      level: 3,
    };

    const map = new window.kakao.maps.Map(mapContainer, mapOption);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const locPosition = new window.kakao.maps.LatLng(lat, lon);

        // 내 위치로 지도 이동
        map.setCenter(locPosition);

        // 내 위치 마커
        new window.kakao.maps.Marker({
          map: map,
          position: locPosition,
          title: "내 위치",
        });

        // 주변 피부과 검색
        const ps = new window.kakao.maps.services.Places();
        ps.keywordSearch(
          "피부과",
          (data, status) => {
            if (status === window.kakao.maps.services.Status.OK) {
              for (let i = 0; i < data.length; i++) {
                const place = data[i];
                const marker = new window.kakao.maps.Marker({
                  map: map,
                  position: new window.kakao.maps.LatLng(place.y, place.x),
                  title: place.place_name,
                });

                const infowindow = new window.kakao.maps.InfoWindow({
                  content: `<div style="padding:5px;font-size:14px;">${place.place_name}</div>`,
                });

                window.kakao.maps.event.addListener(marker, "click", function () {
                  infowindow.open(map, marker);
                });
              }
            }
          },
          { location: locPosition, radius: 3000 }
        );
      });
    }
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">주변 피부과 추천</h2>
      <div id="map" className="w-full h-[500px] rounded-xl shadow" />
    </div>
  );
}
