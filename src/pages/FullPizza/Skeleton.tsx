import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton: React.FC = () => (
  <ContentLoader
    speed={2}
    width={500}
    height={800}
    viewBox="0 0 500 800"
    backgroundColor="#ecebeb"
    foregroundColor="#ecebeb"
  >
    <circle cx="204" cy="205" r="201" />
    <rect x="82" y="444" rx="10" ry="10" width="249" height="34" />
    <rect x="4" y="495" rx="0" ry="0" width="438" height="102" />
    <rect x="2" y="737" rx="0" ry="0" width="176" height="42" />
    <rect x="-1" y="619" rx="10" ry="10" width="444" height="91" />
    <rect x="194" y="738" rx="0" ry="0" width="250" height="41" />
  </ContentLoader>
);

export default Skeleton;
