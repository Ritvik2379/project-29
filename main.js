music=music.mp3;
music2=music2.mp3;
leftwristx=0;
leftwristy=0;
rightwristx=0;
rightwristy=0;
song1status="";
songstatus="";

function preload(){
    song = loadSound(music);
    song1= loadSound(music2);
}

function setup(){
    canvas = createCanvas(600,500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses)
}
function draw(){
    image(video,0,0,600,500);
    if(scoreleftwrist > 0.2){
        circle(leftwristx,leftwristy,20);
        songstatus=song.in();
        song1.stop();
        if(songstatus == true){
            song.play();
        }
        if(scorerightwrist > 0.2){
        circle(rightwristx,rightwristy,20);
        songstatus=song1.in();
        song.stop();
        if(song1status == true){
            song1.play();
        }
        } 
    }
    
}
function modelLoaded(){
    console.log("Posenet is initialized");
}
function gotPoses(results){
    if(results.length>0){
    console.log(results);
    leftwristx=results[0].pose.leftWrist.x;
    leftwristy=results[0].pose.leftWrist.y;
    rightwristx=results[0].pose.rightWrist.x;
    rightwristy=results[0].pose.rightWrist.y;
    console.log("Left wrist X= " + leftwristx + "Left wrist Y= " + leftwristy);
    scoreleftwrist=results[0].pose.keypoints[9].score;
    console.log("Right wrist X= " + rightwristx + "Right wrist Y= " + rightwristy);
    scorerightwrist=results[0].pose.keypoints[10].score;
    console.log("left wrist score " + scoreleftwrist+ "right wrist score " + scorerightwrist);
    
    }
}