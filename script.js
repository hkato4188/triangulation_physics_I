function main(){
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