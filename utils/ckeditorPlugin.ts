class CustomUploadAdapter {
  public loader: any;
  public url: string;
  public token: string;

  private urlPath = "/api/media/images";

  private controller = new AbortController();
  private signal = this.controller.signal;

  constructor(loader: any) {
    this.loader = loader;
    this.url = `http://127.0.0.1:3000${this.urlPath}`;
    // this.url = `https://cademit.com${this.urlPath}`;
    this.token = localStorage.getItem("token") || "sK+PdK6sKmxz624Gf1AcYxRZSwQ2ZxEXrUsAcs3a/rQ=";
  }

  request(file: any) {
    return fetch(this.url, {
      method: "POST",
      headers: {
        "x-csrf-token": this.token,
      },
      body: file,
      signal: this.signal,
    });
  }

  upload() {
    const formData = new FormData();

    this.loader.file.then((newFile: any) => {
      console.log(newFile);
      formData.append("file", newFile, newFile.name);

      return new Promise((resolve, reject) => {
        this.request(formData).then(
          (response) => response.json()
        ).then(
          (data) => {
            console.log(data);
            return resolve(data);
          }
        ).catch(
          (error) => {
            console.log(error);
            return reject(error);
          }
        );
      })
    })
  }

  abort() {
    if (this.controller) {
      this.controller.abort();
    }
  }
}


function CustomUploadAdapterPlugin(editor: any) {
  editor.plugins.get("FileRepository").createUploadAdapter = (loader: any) => {
    return new CustomUploadAdapter(loader);
  };
}

export { CustomUploadAdapter, CustomUploadAdapterPlugin };