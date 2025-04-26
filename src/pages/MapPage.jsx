import { useEffect, useState } from "react";

export default function MapPage() {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://dapi.kakao.com/v2/maps/sdk.js?appkey=6a6492f8fb8e1c114d50540c547a6b65&libraries=services";
    script.async = true;
    script.onload = () => {
      const mapContainer = document.getElementById("map");
      const mapOption = {
        center: new window.kakao.maps.LatLng(37.5665, 126.9780),
        level: 3,
      };

      const map = new window.kakao.maps.Map(mapContainer, mapOption);

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          const locPosition = new window.kakao.maps.LatLng(lat, lon);

          // ✅ 내 위치 마커 (파란색 기본 마커)
          new window.kakao.maps.Marker({
            map: map,
            position: locPosition,
            title: "내 위치",
          });

          map.setCenter(locPosition);

          const ps = new window.kakao.maps.services.Places();
          const options = {
            location: locPosition,
            radius: 5000, // ✅ 반경 5km
            sort: window.kakao.maps.services.SortBy.DISTANCE,
          };

          ps.keywordSearch("피부과", (data, status) => {
            if (status === window.kakao.maps.services.Status.OK) {
              setPlaces(data); // ✅ 리스트 저장
              
              for (let i = 0; i < data.length; i++) {
                const place = data[i];
                new window.kakao.maps.Marker({
                  map: map,
                  position: new window.kakao.maps.LatLng(place.y, place.x),
                  title: place.place_name,
                });
              }
            }
          }, options);
        });
      }
    };

    document.head.appendChild(script);
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">주변 피부과 추천</h2>

      {/* ✅ 지도 */}
      <div id="map" className="w-full h-[500px] rounded-xl shadow mb-6" />

      {/* ✅ 피부과 리스트 */}
      <div className="space-y-4">
        {places.map((place, index) => (
          <div
            key={index}
            className="p-4 bg-white dark:bg-gray-800 border rounded-xl shadow hover:shadow-md transition"
          >
            <div className="font-semibold text-gray-900 dark:text-white">{place.place_name}</div>
            <div className="text-sm text-gray-500">{place.road_address_name || place.address_name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
