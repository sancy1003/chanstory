export default async function uploadImageToStorage(
  image: File,
  name: string
): Promise<string> {
  let imageURL = '';
  if (image) {
    const { uploadURL } = await (await fetch(`/api/uploadImage`)).json();
    const form = new FormData();

    form.append('file', image, name);
    const {
      result: { id },
    } = await (
      await fetch(uploadURL, {
        method: 'POST',
        body: form,
      })
    ).json();
    imageURL = id;
  }

  return imageURL;
}
