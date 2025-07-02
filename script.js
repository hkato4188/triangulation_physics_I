

function main() {
  // iOS 13+ requires permission
    if (typeof DeviceMotionEvent !== "undefined" && typeof DeviceMotionEvent.requestPermission === "function") {
    DeviceMotionEvent.requestPermission()
      .then((response) => {
        if (response === "granted") {
          window.addEventListener("deviceorientation", onOrientationChange);
            navigator.mediaDevices.getUserMedia({ video: {facingMode: 'environment'} })
            .then((signal)=> {
                const video = document.getElementById('myVideo');
                video.srcObject = signal;
                video.play();
            })
        }})
      .catch(console.error);
  } else {
    window.addEventListener("deviceorientation", onOrientationChange); // Non-iOS or older iOS
    navigator.mediaDevices.getUserMedia({ video: {facingMode: 'environment'} })
            .then((signal)=> {
                const video = document.getElementById('myVideo');
                video.srcObject = signal;
                video.play();
            })
  }
}


function onOrientationChange(event) {
    let angle = event.beta - 90;
    if(angle < 0) angle = 0;  // Rotation around the x-axis
    console.log(`Beta: ${angle}`);
    const distanceToObjectMeters=document.getElementById('mySlider').value;
    document.getElementById('myLabel').innerText = `Distance to object: ${distanceToObjectMeters} m`;
    const height = Math.tan(angle*Math.PI/180)* distanceToObjectMeters;
    document.getElementById('heightInfo').innerText = `${height.toFixed(1)} m (${angle.toFixed(1)}°)`;
}