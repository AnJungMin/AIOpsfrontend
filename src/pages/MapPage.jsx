import { useEffect, useState } from "react";

export default function MapPage() {
  const [places, setPlaces] = useState([]);
  const [map, setMap] = useState(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=6a6492f8fb8e1c114d50540c547a6b65&libraries=services`;
    script.async = true;
    script.onload = () => {
      const mapContainer = document.getElementById("map");
      const mapOption = {
        center: new window.kakao.maps.LatLng(37.5665, 126.9780),
        level: 4,
      };

      const newMap = new window.kakao.maps.Map(mapContainer, mapOption);
      setMap(newMap);

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          const locPosition = new window.kakao.maps.LatLng(lat, lon);

          // 내 위치 기본 파란 마커
          new window.kakao.maps.Marker({
            map: newMap,
            position: locPosition,
            title: "내 위치",
          });

          newMap.setCenter(locPosition);

          // 주변 피부과 검색
          const ps = new window.kakao.maps.services.Places();
          ps.keywordSearch("피부과", (data, status) => {
            if (status === window.kakao.maps.services.Status.OK) {
              const sorted = data
                .map((place) => ({
                  ...place,
                  distance: getDistance(lat, lon, place.y, place.x),
                }))
                .sort((a, b) => a.distance - b.distance)
                .slice(0, 5); // 가까운 5개만

              setPlaces(sorted);

              sorted.forEach((place) => {
                const marker = new window.kakao.maps.Marker({
                  map: newMap,
                  position: new window.kakao.maps.LatLng(place.y, place.x),
                });
                place.marker = marker; // 나중에 클릭할 때 접근하려고 저장
              });
            }
          }, { location: locPosition, radius: 5000 });
        });
      }
    };

    document.head.appendChild(script);
  }, []);

  const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3; // meters
    const φ1 = lat1 * Math.PI/180;
    const φ2 = lat2 * Math.PI/180;
    const Δφ = (lat2-lat1) * Math.PI/180;
    const Δλ = (lon2-lon1) * Math.PI/180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    const d = R * c;
    return d;
  };

  const handleMove = (place) => {
    if (map && place.marker) {
      map.panTo(new window.kakao.maps.LatLng(place.y, place.x));
      place.marker.setAnimation(window.kakao.maps.Animation.BOUNCE);
      setTimeout(() => place.marker.setAnimation(null), 1400);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">주변 피부과 추천</h2>
      <div id="map" className="w-full h-[400px] rounded-xl shadow mb-6" />

      {/* 추천 병원 리스트 */}
      <div className="space-y-4">
        {places.map((place, idx) => (
          <div
            key={idx}
            className="p-4 border rounded-xl shadow hover:shadow-md cursor-pointer bg-white dark:bg-gray-800"
            onClick={() => handleMove(place)}
          >
            <div className="font-semibold text-gray-900 dark:text-white">
              {place.place_name}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {place.road_address_name || place.address_name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
