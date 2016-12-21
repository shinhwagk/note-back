export function httpGet(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = () => state_Change();
    xmlhttp.open("GET", url, true);
    xmlhttp.send(null);

    function state_Change() {
      if (xmlhttp.readyState === 4) {
        if (xmlhttp.status === 200) {
          resolve(xmlhttp.responseText);
        } else {
          document.write("ii");
        }
      }
    }
  })
}