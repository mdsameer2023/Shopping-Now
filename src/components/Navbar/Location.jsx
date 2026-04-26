export const getUserLocation = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;

        try {
          const res = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`,
          );
          const data = await res.json();

          resolve(data.city || "Your City");
        } catch {
          reject("Error fetching location");
        }
      },
      () => reject("Permission denied"),
    );
  });
};
