import { useEffect, useState } from "react";

export default function MapPage() {
  const [places, setPlaces] = useState([]);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=6a6492f8fb8e1c114d50540c547a6b65&autoload=false&libraries=services`;
    script.async = true;

    script.onload = () => {
      window.kakao.maps.load(() => {
        initializeMap();
      });
    };

    document.head.appendChild(script);
  }, []);

  const initializeMap = () => {
    const kakao = window.kakao;
    const container = document.getElementById("map");
    if (!container || !kakao) return;

    const options = {
      center: new kakao.maps.LatLng(37.5665, 126.9780),
      level: 5,
    };

    const kakaoMap = new kakao.maps.Map(container, options);
    setMap(kakaoMap);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const locPosition = new kakao.maps.LatLng(lat, lon);

        new kakao.maps.Marker({
          map: kakaoMap,
          position: locPosition,
          title: "내 위치",
        });

        kakaoMap.setCenter(locPosition);

        const ps = new kakao.maps.services.Places();
        ps.keywordSearch(
          "피부과",
          (data, status) => {
            if (status === kakao.maps.services.Status.OK) {
              const nearby = data.slice(0, 5);
              setPlaces(nearby);

              const newMarkers = nearby.map((place) => {
                const marker = new kakao.maps.Marker({
                  map: kakaoMap,
                  position: new kakao.maps.LatLng(place.y, place.x),
                  title: place.place_name,
                });
                return marker;
              });

              setMarkers(newMarkers);
            }
          },
          {
            location: locPosition,
            radius: 5000,
            sort: kakao.maps.services.SortBy.DISTANCE,
          }
        );
      });
    }
  };

  const handleClick = (idx) => {
    if (!map) return;
    const marker = markers[idx];

    map.setCenter(marker.getPosition());

    if (selectedMarker) {
      selectedMarker.setImage(null); // 강조 제거
    }

    const imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
    const imageSize = new window.kakao.maps.Size(40, 40);
    const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize);
    marker.setImage(markerImage);

    setSelectedMarker(marker);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">주변 피부과 추천</h2>
      <div id="map" className="w-full h-[500px] rounded-xl shadow mb-6" />

      <div className="space-y-3">
        {places.map((place, idx) => (
          <div
            key={idx}
            onClick={() => handleClick(idx)}
            className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow cursor-pointer hover:bg-pink-100 dark:hover:bg-pink-800 transition"
          >
            <div className="font-bold">{place.place_name}</div>
            <div className="text-sm text-gray-600">{place.address_name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
