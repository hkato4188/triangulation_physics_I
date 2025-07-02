function main(){
    if (typeof DeviceMotionEvent !== "undefined" && typeof DeviceMotionEvent.requestPermission === "function") {
        // iOS 13+ requires permission
        DeviceMotionEvent.requestPermission()
        .then((response) => {
            if (response === "granted") {
            window.addEventListener("devicemotion", handleMotion);
            } else {
            alert("Permission denied for motion sensors.");
            }
        })
        .catch(console.error);
    } else {
        // Non-iOS or older iOS
        window.addEventListener("devicemotion", handleMotion);
    }
    

function handleMotion(event) {
  // Your logic to update angles and information
  // Example:
  onOrientationChange(event);
    
}
    
    window.addEventListener('deviceorientation', onOrientationChange)

    navigator.mediaDevices.getUserMedia({ video: {facingMode: 'environment'} })
        .then(function(signal) {
            const video = document.getElementById('myVideo');
            video.srcObject = signal;
            video.play();
        })
        .catch((err) => {  
            alert('Error accessing camera: ' + err.message);
            console.error('Error accessing camera:', err);
        })
}

function onOrientationChange(event) {
    
    let angle = event.beta - 90;
    if(angle < 0) angle = 0;  // Rotation around the x-axis
    console.log(`Beta: ${angle}`);
    const distanceToTreeMeters=document.getElementById('mySlider').value;
    document.getElementById('myLabel').innerText = `Distance to tree: ${distanceToTreeMeters} m`;  
    const height = Math.tan(angle*Math.PI/180)* distanceToTreeMeters;
    document.getElementById('heightInfo').innerText = `${height.toFixed(1)} m (${angle.toFixed(1)}°)`;
}