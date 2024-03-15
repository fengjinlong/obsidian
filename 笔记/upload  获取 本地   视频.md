const handleChange = (file) => {
  const _file = file.raw;
  let blob = new Blob([_file], { type: "audio/mp4" });

  params.videoUrl = URL.createObjectURL(blob);
};



获取第一针图片
```
const captureImage = () => {
  let video = document.getElementById("upvideo");
  let canvas = document.getElementById("mycanvas");
  // video.crossOrigin = "anonymous";
  // video.currentTime = 1;
  canvas.width = 300;
  canvas.height = 300;
  canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
  let imgSrc = canvas.toDataURL("image/png");
  console.log(imgSrc);
  params.coverUrl = imgSrc;
  //显示在页面中
};```