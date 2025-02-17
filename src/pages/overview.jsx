import React, { useState } from 'react';
import OverviewTemplate from '../components/templates/overviewTemplate';

const Overview = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <OverviewTemplate isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
  );
};

export default Overview;