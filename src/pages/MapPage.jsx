import { useEffect, useState } from "react";

export default function MapPage() {
  const [places, setPlaces] = useState([]);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=6a6492f8fb8e1c114d50540c547a6b65&libraries=services`;
    script.async = true;
    script.onload = () => {
      const mapContainer = document.getElementById("map");
      const mapOption = {
        center: new window.kakao.maps.LatLng(37.5665, 126.9780),
        level: 3,
      };

      const createdMap = new window.kakao.maps.Map(mapContainer, mapOption);
      setMap(createdMap);

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          const locPosition = new window.kakao.maps.LatLng(lat, lon);

          new window.kakao.maps.Marker({
            map: createdMap,
            position: locPosition,
            title: "내 위치",
          });

          createdMap.setCenter(locPosition);

          // 병원 검색
          const ps = new window.kakao.maps.services.Places();
          const options = {
            location: locPosition,
            radius: 5000,
            sort: window.kakao.maps.services.SortBy.DISTANCE,
          };

          ps.keywordSearch("피부과", (data, status) => {
            if (status === window.kakao.maps.services.Status.OK) {
              const topFive = data.slice(0, 5); // ✅ 상위 5개만
              setPlaces(topFive);

              const newMarkers = topFive.map((place) => {
                const marker = new window.kakao.maps.Marker({
                  map: createdMap,
                  position: new window.kakao.maps.LatLng(place.y, place.x),
                  title: place.place_name,
                });
                return marker;
              });

              setMarkers(newMarkers);
            }
          }, options);
        });
      }
    };

    document.head.appendChild(script);
  }, []);

  const handlePlaceClick = (index) => {
    if (!map || !places[index]) return;
    const selectedPlace = places[index];
    const selectedLatLng = new window.kakao.maps.LatLng(selectedPlace.y, selectedPlace.x);

    map.panTo(selectedLatLng);

    // 모든 마커 크기 원래대로, 클릭한 마커만 키우기
    markers.forEach((marker, i) => {
      const imageSrc = i === index
        ? "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png" // 강조 마커
        : "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png"; // 기본 마커

      const imageSize = new window.kakao.maps.Size(36, 36);
      const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize);
      marker.setImage(markerImage);
    });
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold mb-4">주변 피부과 추천</h2>
      <div id="map" className="w-full h-[500px] rounded-xl shadow" />

      {/* ✅ 병원 리스트 */}
      <div className="grid gap-3 mt-6">
        {places.map((place, idx) => (
          <button
            key={place.id}
            onClick={() => handlePlaceClick(idx)}
            className="w-full p-4 border rounded-xl bg-gray-800 hover:bg-gray-700 text-left text-white transition"
          >
            <div className="font-semibold">{place.place_name}</div>
            <div className="text-xs text-gray-400">{place.road_address_name || place.address_name}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
