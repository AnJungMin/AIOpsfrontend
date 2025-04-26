import { useEffect, useState } from "react";

export default function MapPage() {
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [places, setPlaces] = useState([]);
  const [selectedMarkerIndex, setSelectedMarkerIndex] = useState(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=6a6492f8fb8e1c114d50540c547a6b65&libraries=services`;
    script.async = true;
    script.onload = () => {
      const mapContainer = document.getElementById("map");
      const mapOption = {
        center: new window.kakao.maps.LatLng(37.5665, 126.9780),
        level: 5,
      };

      const kakaoMap = new window.kakao.maps.Map(mapContainer, mapOption);
      setMap(kakaoMap);

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          const locPosition = new window.kakao.maps.LatLng(lat, lon);

          // 내 위치 마커
          new window.kakao.maps.Marker({
            map: kakaoMap,
            position: locPosition,
          });

          kakaoMap.setCenter(locPosition);

          const ps = new window.kakao.maps.services.Places();
          ps.keywordSearch("피부과", (data, status) => {
            if (status === window.kakao.maps.services.Status.OK) {
              const limitedData = data.slice(0, 5); // 5개만 사용
              setPlaces(limitedData);

              const createdMarkers = limitedData.map((place) => {
                return new window.kakao.maps.Marker({
                  map: kakaoMap,
                  position: new window.kakao.maps.LatLng(place.y, place.x),
                });
              });
              setMarkers(createdMarkers);
            }
          }, { location: locPosition, radius: 5000, sort: window.kakao.maps.services.SortBy.DISTANCE });
        });
      }
    };

    document.head.appendChild(script);
  }, []);

  const handleListClick = (idx) => {
    if (!map) return;

    markers.forEach((marker, i) => {
      const imageSrc = i === idx
        ? "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png" // 선택시 빨간 마커
        : "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_blue.png"; // 기본 파란 마커

      const imageSize = new window.kakao.maps.Size(40, 40);
      const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize);
      marker.setImage(markerImage);
    });

    map.setCenter(markers[idx].getPosition());
    setSelectedMarkerIndex(idx);
  };

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-xl font-bold">주변 피부과 추천</h2>

      {/* 지도 */}
      <div id="map" className="w-full h-[400px] rounded-xl shadow" />

      {/* 리스트 */}
      <div className="space-y-2">
        {places.map((place, idx) => (
          <div
            key={idx}
            onClick={() => handleListClick(idx)}
            className={`p-3 rounded-lg cursor-pointer border ${selectedMarkerIndex === idx ? 'bg-rose-100 border-rose-400' : 'bg-white dark:bg-gray-800'}`}
          >
            <p className="font-semibold">{place.place_name}</p>
            <p className="text-sm text-gray-500">{place.address_name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
