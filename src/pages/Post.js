import React, { useState } from 'react';

import { Input, TextArea, Button } from '../components/FormComponents';

const userId = 1234;

function Post() {
  const [ title, setTitle ] = useState("");
  const [ body, setBody ] = useState("");
  return (
    <form onSubmit={(e) => {
      e.preventDefault();
    }}>
      <div>
        <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div>
        <TextArea placeholder="Body" value={body} onChange={(e) => setBody(e.target.value)} />
      </div>
      <div>
        <Button>Submit</Button>
      </div>
    </form>
  );
}

export default Post;
