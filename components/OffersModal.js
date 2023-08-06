import React, { useState, useEffect } from 'react';
import axios from 'axios';
import VideoPlayer from './VideoPlayer';
import useSWR from 'swr';
import $ from 'jquery'; // Import jQuery

const fetcher = (url) => fetch(url).then((res) => res.json());
const useLeadsChecking = (trackingId) => {
  const [completedLeads, setCompletedLeads] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [offers, setOffers] = useState(null);
  useEffect(() => {
    const userID = process.env.CPABUILD_ID;
    const apikeyx = process.env.CPABUILD_KEY;
    $.getJSON("https://d1o5dfevtxsvcn.cloudfront.net/public/offers/feed.php?user_id="+userID+"&api_key="+apikeyx+"&s1="+trackingId+"&s2=&callback=?",
			function(offers){
				var html = '';
				var numOffers=3; //Change to trim offers. Max is 10.
				offers=offers.splice(0,numOffers);
				setOffers(offers);
				
			});
    function checkLeads() {
      setLoading(true);
      // Use $.getJSON from jQuery to make the JSONP request
      $.getJSON('https://d2tk42wfs4q183.cloudfront.net/public/external/check2.php?testing=0&callback=?')
        .done((leads) => {
          setLoading(false);
         
          if (leads.length > 0) {
            setCompletedLeads(leads);
            const offerIds = leads.map((lead) => parseInt(lead.offer_id));
            const earningsInCents = leads.reduce((total, lead) => total + parseFloat(lead.points), 0);
            console.log(
              `SUMMARY: User has completed ${leads.length} leads, for $${(earningsInCents / 100).toFixed(2)} earnings, on offer ids: ${offerIds.join(',')}`
            );
            clearInterval(intervalId);
          } else {
           // setCompletedLeads([{ id: 1, offer_id: 123, points: 100 }, { id: 2, offer_id: 456, points: 200 }]);
            console.log('No leads were found');
           // clearInterval(intervalId);
          }
        })
        .fail((error) => {
          setLoading(false);
          console.error('Error fetching leads:', error);
        });
    }

    // Call the checkLeads function initially when the component mounts
    checkLeads();

    const intervalId = setInterval(checkLeads, 19500);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [trackingId]);

  return { completedLeads, isLoading, offers };
};

const OffersModal = ({ trackingId, imdb_id }) => {
  const { completedLeads, isLoading, offers } = useLeadsChecking(trackingId);


  if (!offers) {
    return <div>Loading...</div>;
  }

  const maxOffers = 3;
  const filteredOffers = offers;


 

 
  return (
    <section className="opacity-100 transition-opacity duration-500 text-gray-400 bg-app-semi-dark-blue body-font">
       {completedLeads.length > 0 ? (
  <div>
    <VideoPlayer imdbId={imdb_id} />
  </div>
) : (
  <div className="container px-5 py-5 mx-auto">
        <div className="flex flex-col text-center w-full mb-5">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-white">
            Complete 1 free offer from the list below to unlock this movie!
          </h1>
         
          <h2 className='text-xs font-light text-app-placeholder sm:text-sm md:text-lg'>
          Start one of the tasks below to unlock this movie for free
      </h2>
        </div>
        <div className="flex flex-wrap -m-2">
          {filteredOffers.map((item) => (
            <div key={item.url} className="p-2 w-full">
              <a
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="offrlink offer_item bdaOfferk sxlikgi tip_over_link link_a"
                data-toggle="tooltip"
                data-placement="bottom"
                title={item.conversion}
              >
                <div className="h-full flex items-center bg-app-greyish-blue border-gray-800 border p-4 rounded-lg">
                  <div className="flex-grow">
                    <h2 className="text-white title-font font-medium">{item.anchor}</h2>
                    <p className="text-gray-300">{item.conversion}</p>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
)}
      
    </section>
  );
};

export default OffersModal;
