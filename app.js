document.addEventListener("DOMContentLoaded", () => {
  function calculateSpeed(fileSizeInBytes, durationInSeconds) {
    // Convert fileSize to bits
    const fileSizeInBits = fileSizeInBytes * 8;

    // Convert to megabits per second (Mbps)
    const speedInMegabits = fileSizeInBits / 1000000 / durationInSeconds;

    // Convert to kilobits per second (kbps)
    const speedInKilobits = fileSizeInBits / 1000 / durationInSeconds;

    return {
      speedInMegabits: speedInMegabits.toFixed(2),
      speedInKilobits: speedInKilobits.toFixed(2),
    };
  }

  function testInternetSpeed() {
    const numRequests = 4;
    let totalSpeedInKilobits = 0;
    let completedRequests = 0;

    function makeRequest() {
      const startTime = new Date().getTime();

      fetch("https://source.unsplash.com/random?topic=nature")
        .then((response) => response.blob())
        .then((blob) => {
          const endTime = new Date().getTime();
          const duration = (endTime - startTime) / 1000; // in seconds
          const fileSize = blob.size;
          const speeds = calculateSpeed(fileSize, duration);

          totalSpeedInKilobits += parseFloat(speeds.speedInKilobits);
          completedRequests++;

          console.log("Speed in Mbps:", speeds.speedInMegabits + " Mbps");
          console.log("Speed in kbps:", speeds.speedInKilobits + " kbps");

          // After the last request, calculate and log the average speed

          const speedEl = document.getElementById("speed");

          const averageSpeed = totalSpeedInKilobits / numRequests;
          const averageSpeedDisplay =
            averageSpeed < 500
              ? averageSpeed.toFixed(2) + " kbps"
              : (averageSpeed / 1000).toFixed(2) + " Mbps";
          console.log("Average Speed:", averageSpeedDisplay);
          speedEl.innerText = averageSpeedDisplay;
        })
        .catch((error) => console.error("Error:", error));
    }

    // Trigger multiple requests
    for (let i = 0; i < numRequests; i++) {
      makeRequest();
    }
  }

  // Trigger the speed test when the page loads
  testInternetSpeed();

  const test_again = document.getElementById("test_again");

  test_again.addEventListener("click", () => {
    testInternetSpeed();
  });
});
