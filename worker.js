self.onmessage = async (e) => {
  const { id, type, data } = e.data;
  if (type === 'LOAD') {
    try {
      importScripts(data.coreURL);
      const ffmpeg = await self.createFFmpegCore({
        mainScriptUrlOrBlob: `${data.coreURL}#${btoa(JSON.stringify({ wasmURL: data.wasmURL, workerURL: data.workerURL }))}`
      });
      self.ffmpeg = ffmpeg;
      self.postMessage({ id, type, data: true });
    } catch (err) {
      self.postMessage({ id, type: 'ERROR', data: err.toString() });
    }
  }
};
