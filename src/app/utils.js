export const wait = (ms) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

export const createTag = ({ name, _id }) => ({
  name,
  _id: _id ?? ~~(Math.random() * 10 ** 6),
});

export const createResource = ({ title, url, tags, _id }) => ({
  title,
  url,
  tags,
  _id: _id ?? ~~(Math.random() * 10 ** 6),
});

export const createNote = ({ resourceID, content, _id }) => ({
  resourceID,
  content,
  _id: _id ?? ~~(Math.random() * 10 ** 6),
});
