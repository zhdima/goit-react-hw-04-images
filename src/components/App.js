import { useState } from 'react';
import { Layout } from './Layout';
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";

export const App = () => {

  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Layout>
      <Searchbar onSubmit={setSearchQuery} />
      <ImageGallery searchQuery={searchQuery} />
    </Layout>
  );
};
