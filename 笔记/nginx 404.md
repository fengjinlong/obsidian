location /rootpath/ {
    root   html;
    index  index.html index.htm;
    try_files $uri $uri/ /rootpath/index.html;
}