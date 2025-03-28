// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { ColorRing } from 'react-loader-spinner';
// import { Link, useNavigate } from 'react-router-dom';
// import './style.css';

// const Voting = () => {
//   const [candidates, setCandidates] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [voteSuccess, setVoteSuccess] = useState(false);
//   const [voteError, setVoteError] = useState(null);
//   const [token, setToken] = useState('');
//     const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
//   const [selectedCandidateId, setSelectedCandidateId] = useState(null); // Selected candidate state
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchCandidates = async () => {
//       setLoading(true);
//       const storedToken = localStorage.getItem('token');

//       if (storedToken) {
//         setToken(storedToken);
//       }
//       try {
//         const response = await axios.get('http://localhost:4444/voting', {
//           headers: {
//             Authorization: `Bearer ${storedToken}`
//           }
//         });
//         console.log('Frontend Response:', response.data);
//         if (response.data === "already voted") {
//           navigate("/voted");
//         } else {
//           const sortedCandidates = response.data.sort((a, b) => a.fullName.localeCompare(b.fullName));
//           setCandidates(sortedCandidates);
//         }
//       } catch (error) {
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCandidates();
//   }, [navigate]);

//   const handleVote = async (candidateId) => {
//     const userConfirmed = window.confirm('Are you sure you want to cast your vote? Once submitted, it cannot be changed.');

//     if (userConfirmed) {
//       try {
//         const response = await axios.post('http://localhost:4444/voting', { candidateId }, {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         });
//         setVoteSuccess(true);
//         console.log(response.data);
//         navigate("/voted");
//       } catch (error) {
//         if (error.response) {
//           setVoteError(error.response.data.message);
//         } else if (error.request) {
//           setVoteError('Network Error: No response received');
//         } else {
//           setVoteError('Network Error: Setting up the request failed');
//         }
//         console.error('Error casting vote:', error);
//       }
//     } else {
//       console.log('User cancelled the vote.');
//     }
//   };
//   const openConfirmationModal = (candidateId) => {
//         setSelectedCandidateId(candidateId);
//         setIsModalOpen(true); // Open modal
//       };
    
//       const closeModal = () => {
//         setIsModalOpen(false); // Close modal
//       };
    

//   return (
//     <div className="flex bg-cover bg-center min-h-screen"
//       style={{
//         backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.2)), url(https://media.istockphoto.com/id/464623500/photo/group-of-people-waving-indian-flags-in-back-lit.jpg?s=612x612&w=0&k=20&c=kpiw0XVr-Sjc0iaSKXVcXbP2otCdPaH0-N90avg2NIg=)',
//         backgroundSize: 'cover'
//       }}  
//     >
//       {/* <nav className="navbar bg-blue-500 p-4 w-full fixed top-0 z-10 flex justify-between items-center"> */}
//       <nav className="navbar bg-gradient-to-r from-blue-800 to-blue-500 p-4 w-full fixed top-0 z-10 flex justify-between items-center">

//         <h1 className="text-white text-2xl font-bold whitespace-nowrap">evote Voting System</h1>

//         <div className="scrolling-text-container text-white text-2xl font-bold">
//           <div className="scrolling-text">
//             <p>Remember: you can only vote once—shape the future by choosing the leader who aligns with your vision!</p>
//           </div>
//         </div>
//         {/* <Link to="/vote/profile">
//           <button className="bg-white text-blue-500 font-semibold py-2 px-4 rounded-full hover:bg-gray-100 transition-all">
//             Profile
//           </button>
//         </Link> */}
//       {/* <Link to="/vote/profile">
//   <button className="bg-white border border-white text-gradient font-semibold py-2 px-4 rounded-full hover:bg-blue-500 hover:text-white transition-all">
//     <span className="bg-gradient-to-r from-blue-800 to-blue-500 bg-clip-text text-transparent">
//       Profile
//     </span>
//   </button>
// </Link> */}
// <Link to="/vote/profile">
//   <button className="bg-white border border-white font-semibold py-2 px-4 rounded-full hover:bg-blue-500 transition-all">
//     <span className="bg-gradient-to-r from-blue-800 to-blue-500 bg-clip-text text-transparent hover:text-white">
//       Profile
//     </span>
//   </button>
// </Link>



//       </nav>

//       <div className="w-full min-h-screen p-10 mt-[80px]">
//         <div className="absolute top-4">
//           {error && (
//             <div className="text-center py-4 bg-red-100 rounded-md">
//               <p className="text-red-500">Error: {error}</p>
//             </div>
//           )}
//           {voteSuccess && (
//             <div className="text-center py-4 bg-green-100 rounded-md">
//               <p className="text-green-500">Vote cast successfully!</p>
//             </div>
//           )}
//           {voteError && (
//             <div className="text-center py-4 bg-red-100 rounded-md">
//               <p className="text-red-500">Error casting vote: {voteError}</p>
//             </div>
//           )}
//         </div>
//         {!loading ? (
//           candidates && Array.isArray(candidates) && candidates.length > 0 ? (
//             <div className="mx-auto w-[100%] max-w-7xl px-4 py-8">
//               <h1 className="font-extrabold flex justify-center text-white text-5xl mb-8">Please Vote. Your Vote Matters!!</h1>
//               <div className="table-wrapper">
//               <table className="w-full mt-6 table-fixed border-collapse border border-gray-300 shadow-lg rounded-lg">
//             <thead>
//               <tr className="bg-gradient-to-r from-blue-800 to-blue-500 text-white">
//                 <th className="w-1/6 border px-4 py-2 border-gray-300">S.No</th>
//                 <th className="w-2/6 border px-4 py-2 border-gray-300">Name of Candidate</th>
//                 <th className="w-1/6 border px-4 py-2 border-gray-300">Name of Party</th>
//                 <th className="w-1/6 border px-4 py-2 border-gray-300">Party Logo</th>
//                 <th className="w-1/6 border px-4 py-2 border-gray-300">No of Votes</th>
//                 {/* <th className="w-1/6 border px-4 py-2 border-gray-300">Action</th> */}
//               </tr>
//             </thead>
//                   <tbody>
//                     {candidates.map((candidate, index) => (
//                       <tr key={candidate.id} className="bg-gray-100 border-b border-gray-200">
//                         <td className="px-4 py-2 text-center">{index + 1}</td>
//                         <td className="px-4 py-2 text-center">{candidate.fullName}</td>
//                         <td className="px-4 py-2 text-center">{candidate.partyname}</td>
//                         <td className="px-4 py-2 text-center">
//                           <img src={candidate.partylogo} alt={candidate.partyname} className="h-16 w-16 object-cover mx-auto rounded-lg" />
//                         </td>
//                         <td className="px-4 py-2 text-center">
//                           {/* <button
//                             onClick={() => handleVote(candidate.id)}
//                             className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//                           >
//                             Vote
//                           </button> */}
//                           <button
//   onClick={() => handleVote(candidate.id)}
//   className="bg-gradient-to-r from-blue-800 to-blue-500 hover:from-blue-700 hover:to-blue-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
// >
//   Vote
// </button>

//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           ) : (
//             <div className="text-center py-4 bg-blue-100">
//               <p>No candidates available</p>
//             </div>
//           )
//         ) : (
//           <div className="w-full min-h-screen flex justify-center m-auto">
//             <ColorRing
//               visible={true}
//               height="80"
//               width="500"
//               ariaLabel="color-ring-loading"
//               wrapperStyle={{}}
//               wrapperClass="color-ring-wrapper"
//               colors={['#007bff', '#0056b3', '#003f7f', '#001f4c', '#000f33']}
//             />
//           </div>
//         )}
//       </div>
//       <ConfirmationModal
//         isOpen={isModalOpen}
//         onRequestClose={closeModal}
//         onConfirm={handleVote}
//       />
//     </div>
    
//   );
// };

// export default Voting;

// // import axios from 'axios';
// // import React, { useEffect, useState } from 'react';
// // import { ColorRing } from 'react-loader-spinner';
// // import { Link, useNavigate } from 'react-router-dom';
// // import ConfirmationModal from './ConfirmationModal'; // Import the custom modal
// // import './voting.css';

// // const Voting = () => {
// //   const [candidates, setCandidates] = useState([]);
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState(null);
// //   const [voteSuccess, setVoteSuccess] = useState(false);
// //   const [voteError, setVoteError] = useState(null);
// //   const [token, setToken] = useState('');
// //   const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
// //   const [selectedCandidateId, setSelectedCandidateId] = useState(null); // Selected candidate state
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     const fetchCandidates = async () => {
// //       setLoading(true);
// //       const storedToken = localStorage.getItem('token');

// //       if (storedToken) {
// //         setToken(storedToken);
// //       }
// //       try {
// //         const response = await axios.get('http://localhost:4444/voting', {
// //           headers: {
// //             Authorization: `Bearer ${storedToken}`,
// //           },
// //         });
// //         if (response.data === 'already voted') {
// //           navigate('/voted');
// //         } else {
// //           const sortedCandidates = response.data.sort((a, b) =>
// //             a.fullName.localeCompare(b.fullName)
// //           );
// //           setCandidates(sortedCandidates);
// //         }
// //       } catch (error) {
// //         setError(error.message);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchCandidates();
// //   }, [navigate]);

// //   const handleVote = async () => {
// //     try {
// //       const response = await axios.post(
// //         'http://localhost:4444/voting',
// //         { candidateId: selectedCandidateId },
// //         {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //           },
// //         }
// //       );
// //       setVoteSuccess(true);
// //       navigate('/voted');
// //     } catch (error) {
// //       if (error.response) {
// //         setVoteError(error.response.data.message);
// //       } else if (error.request) {
// //         setVoteError('Network Error: No response received');
// //       } else {
// //         setVoteError('Network Error: Setting up the request failed');
// //       }
// //     }
// //   };

// //   const openConfirmationModal = (candidateId) => {
// //     setSelectedCandidateId(candidateId);
// //     setIsModalOpen(true); // Open modal
// //   };

// //   const closeModal = () => {
// //     setIsModalOpen(false); // Close modal
// //   };

// //   return (
// //     <div className="flex bg-cover bg-center min-h-screen"
// //       style={{
// //         backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.2)), url(https://media.istockphoto.com/id/464623500/photo/group-of-people-waving-indian-flags-in-back-lit.jpg?s=612x612&w=0&k=20&c=kpiw0XVr-Sjc0iaSKXVcXbP2otCdPaH0-N90avg2NIg=)',
// //         backgroundSize: 'cover',
// //       }}
// //     >
// //       <nav className="bg-white border-gray-200 dark:bg-gray-900r">
// //         <h1 className="text-white text-2xl font-bold whitespace-nowrap">Chunavi Portal</h1>

// //         <Link to="/vote/profile">
// //           <button className="bg-white border border-white font-semibold py-2 px-4 rounded-full hover:bg-blue-500 transition-all">
// //             <span className="bg-gradient-to-r from-blue-800 to-blue-500 bg-clip-text text-transparent hover:text-white">
// //               Profile
// //             </span>
// //           </button>
// //         </Link>
// //       </nav>

// //       <div className="w-full min-h-screen p-10 mt-[80px]">
// //         {error && (
// //           <div className="text-center py-4 bg-red-100 rounded-md">
// //             <p className="text-red-500">Error: {error}</p>
// //           </div>
// //         )}
// //         {voteSuccess && (
// //           <div className="text-center py-4 bg-green-100 rounded-md">
// //             <p className="text-green-500">Vote cast successfully!</p>
// //           </div>
// //         )}
// //         {voteError && (
// //           <div className="text-center py-4 bg-red-100 rounded-md">
// //             <p className="text-red-500">Error casting vote: {voteError}</p>
// //           </div>
// //         )}
// //         {!loading ? (
// //           candidates && Array.isArray(candidates) && candidates.length > 0 ? (
// //             <div className="mx-auto w-[100%] max-w-7xl px-4 py-8">
// //               <h1 className="font-extrabold flex justify-center text-white text-5xl mb-8">Please Vote. Your Vote Matters!!</h1>
// //               <div className="table-wrapper">
// //                 <table className="w-full mt-6 table-fixed border-collapse border border-gray-300 shadow-lg rounded-lg">
// //                   <thead>
// //                     <tr className="bg-gradient-to-r from-blue-800 to-blue-500 text-white">
// //                       <th className="w-1/6 border px-4 py-2 border-gray-300">S.No</th>
// //                       <th className="w-2/6 border px-4 py-2 border-gray-300">Name of Candidate</th>
// //                       <th className="w-1/6 border px-4 py-2 border-gray-300">Name of Party</th>
// //                       <th className="w-1/6 border px-4 py-2 border-gray-300">Party Logo</th>
// //                       <th className="w-1/6 border px-4 py-2 border-gray-300">No of Votes</th>
// //                     </tr>
// //                   </thead>
// //                   <tbody>
// //                     {candidates.map((candidate, index) => (
// //                       <tr key={candidate.id} className="bg-gray-100 border-b border-gray-200">
// //                         <td className="px-4 py-2 text-center">{index + 1}</td>
// //                         <td className="px-4 py-2 text-center">{candidate.fullName}</td>
// //                         <td className="px-4 py-2 text-center">{candidate.partyname}</td>
// //                         <td className="px-4 py-2 text-center">
// //                           <img src={candidate.partylogo} alt={candidate.partyname} className="h-16 w-16 object-cover mx-auto rounded-lg" />
// //                         </td>
// //                         <td className="px-4 py-2 text-center">
// //                           <button
// //                             onClick={() => openConfirmationModal(candidate.id)}
// //                             className="bg-gradient-to-r from-blue-800 to-blue-500 hover:from-blue-700 hover:to-blue-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
// //                           >
// //                             Vote
// //                           </button>
// //                         </td>
// //                       </tr>
// //                     ))}
// //                   </tbody>
// //                 </table>
// //               </div>
// //             </div>
// //           ) : (
// //             <div className="text-center py-4 bg-blue-100">
// //               <p>No candidates available</p>
// //             </div>
// //           )
// //         ) : (
// //           <div className="w-full min-h-screen flex justify-center m-auto">
// //             <ColorRing
// //               visible={true}
// //               height="100"
// //               width="100"
// //               ariaLabel="blocks-loading"
// //               wrapperStyle={{}}
// //               wrapperClass="blocks-wrapper"
// //               colors={["#02529d", "#d4d4d4", "#002855", "#fef9ef", "#00204f"]}
// //             />
// //           </div>
// //         )}
// //       </div>

// //       {/* Modal for confirmation */}
// //       <ConfirmationModal
// //         isOpen={isModalOpen}
// //         onRequestClose={closeModal}
// //         onConfirm={handleVote}
// //       />
// //     </div>
// //   );
// // };

// // export default Voting;

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ColorRing } from 'react-loader-spinner';
import { Link, useNavigate } from 'react-router-dom';
import './style.css';

// Modal Component
const ConfirmationModal = ({ isOpen, onRequestClose, onConfirm, candidateName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-xl font-bold mb-4">Confirm Vote</h2>
        <p>Are you sure you want to vote for <strong>{candidateName}</strong>? This action cannot be undone.</p>
        <div className="flex justify-end mt-4">
          <button
            onClick={onRequestClose}
            className="bg-gray-300 text-black font-bold py-2 px-4 rounded mr-2"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Confirm Vote
          </button>
        </div>
      </div>
    </div>
  );
};

const Voting = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [voteSuccess, setVoteSuccess] = useState(false);
  const [voteError, setVoteError] = useState(null);
  const [token, setToken] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [selectedCandidate, setSelectedCandidate] = useState(null); // Selected candidate state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCandidates = async () => {
      setLoading(true);
      const storedToken = localStorage.getItem('token');

      if (storedToken) {
        setToken(storedToken);
      }
      try {
        const response = await axios.get('https://backendvs-2.onrender.com/voting', {
          headers: {
            Authorization: `Bearer ${storedToken}`
          }
        });
        console.log('Frontend Response:', response.data);
        if (response.data === "already voted") {
          navigate("/voted");
        } else {
          const sortedCandidates = response.data.sort((a, b) => a.fullName.localeCompare(b.fullName));
          setCandidates(sortedCandidates);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, [navigate]);

  const handleVote = async () => {
    const candidateId = selectedCandidate.id;
    const userConfirmed = window.confirm('Are you sure you want to cast your vote? Once submitted, it cannot be changed.');

    if (userConfirmed) {
      try {
        const response = await axios.post('https://backendvs-2.onrender.com/voting', { candidateId }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setVoteSuccess(true);
        console.log(response.data);
        navigate("/voted");
      } catch (error) {
        if (error.response) {
          setVoteError(error.response.data.message);
        } else if (error.request) {
          setVoteError('Network Error: No response received');
        } else {
          setVoteError('Network Error: Setting up the request failed');
        }
        console.error('Error casting vote:', error);
      }
    }
  };

  const openConfirmationModal = (candidate) => {
    setSelectedCandidate(candidate); // Set selected candidate
    setIsModalOpen(true); // Open modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close modal
  };

  return (
    <div className="flex bg-cover bg-center min-h-screen"
      style={{
        backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.2)), url(https://media.istockphoto.com/id/464623500/photo/group-of-people-waving-indian-flags-in-back-lit.jpg?s=612x612&w=0&k=20&c=kpiw0XVr-Sjc0iaSKXVcXbP2otCdPaH0-N90avg2NIg=)',
        backgroundSize: 'cover'
      }}  
    >
      <nav className="navbar bg-gradient-to-r from-blue-800 to-blue-500 p-4 w-full fixed top-0 z-10 flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold whitespace-nowrap">evote Voting System</h1>

        <div className="scrolling-text-container text-white text-2xl font-bold">
          <div className="scrolling-text">
            <p>Remember: you can only vote once—shape the future by choosing the leader who aligns with your vision!</p>
          </div>
        </div>

        <Link to="/vote/profile">
          <button className="bg-white border border-white font-semibold py-2 px-4 rounded-full hover:bg-blue-500 transition-all">
            <span className="bg-gradient-to-r from-blue-800 to-blue-500 bg-clip-text text-transparent hover:text-white">
              Profile
            </span>
          </button>
        </Link>
      </nav>

      <div className="w-full min-h-screen p-10 mt-[80px]">
        <div className="absolute top-4">
          {error && (
            <div className="text-center py-4 bg-red-100 rounded-md">
              <p className="text-red-500">Error: {error}</p>
            </div>
          )}
          {voteSuccess && (
            <div className="text-center py-4 bg-green-100 rounded-md">
              <p className="text-green-500">Vote cast successfully!</p>
            </div>
          )}
          {voteError && (
            <div className="text-center py-4 bg-red-100 rounded-md">
              <p className="text-red-500">Error casting vote: {voteError}</p>
            </div>
          )}
        </div>
        {!loading ? (
          candidates && Array.isArray(candidates) && candidates.length > 0 ? (
            <div className="mx-auto w-[100%] max-w-7xl px-4 py-8">
              <h1 className="font-extrabold flex justify-center text-white text-5xl mb-8">Please Vote. Your Vote Matters!!</h1>
              <div className="table-wrapper">
                <table className="w-full mt-6 table-fixed border-collapse border border-gray-300 shadow-lg rounded-lg">
                  <thead>
                    <tr className="bg-gradient-to-r from-blue-800 to-blue-500 text-white">
                      <th className="w-1/6 border px-4 py-2 border-gray-300">S.No</th>
                      <th className="w-2/6 border px-4 py-2 border-gray-300">Name of Candidate</th>
                      <th className="w-1/6 border px-4 py-2 border-gray-300">Name of Party</th>
                      <th className="w-1/6 border px-4 py-2 border-gray-300">Party Logo</th>
                      <th className="w-1/6 border px-4 py-2 border-gray-300">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {candidates.map((candidate, index) => (
                      <tr key={candidate.id} className="bg-gray-100 border-b border-gray-200">
                        <td className="px-4 py-2 text-center">{index + 1}</td>
                        <td className="px-4 py-2 text-center">{candidate.fullName}</td>
                        <td className="px-4 py-2 text-center">{candidate.partyname}</td>
                        <td className="px-4 py-2 text-center">
                          <img src={candidate.partylogo} alt={candidate.partyname} className="h-16 w-16 object-cover mx-auto rounded-lg" />
                        </td>
                        <td className="px-4 py-2 text-center">
                          <button
                            onClick={() => openConfirmationModal(candidate)}
                            className="bg-gradient-to-r from-blue-800 to-blue-500 hover:from-blue-700 hover:to-blue-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                          >
                            Vote
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="text-center py-4 bg-blue-100">
              <p>No candidates available</p>
            </div>
          )
        ) : (
          <div className="w-full min-h-screen flex justify-center items-center">
            <ColorRing
              visible={true}
              height="80"
              width="80"
              ariaLabel="blocks-loading"
              wrapperClass="blocks-wrapper"
              colors={['#007BFF', '#0062CC', '#0056b3', '#003D7C', '#001F3F']}
            />
          </div>
        )}

        <ConfirmationModal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          onConfirm={handleVote}
          candidateName={selectedCandidate?.fullName} // Pass selected candidate name to modal
        />
      </div>
    </div>
  );
};

export default Voting;
