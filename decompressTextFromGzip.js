async function decompressTextFromGzip(gzip) {
  let data = fetch(gzip)
    .then(async (res) => {
      return await res.blob();
    })
    .then(async (blob) => {
      const ds = new DecompressionStream('gzip');
      const decompressedStream = blob.stream().pipeThrough(ds);
      let text = await new Response(decompressedStream).text();
      return text;
    });
  return data;
}
decompressTextFromGzip('./test.txt.gz').then((text) => console.log(text));
