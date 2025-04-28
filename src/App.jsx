import React from 'react';
import SignIn from './components/SignIn';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Working from './components/Working';
import Support from './components/Support';
import Footer from './components/Footer';
import Room from './components/Room';
import LiveChat from './components/LiveChat';
import VideoPlayer from './components/VideoPlayer';
import ProfileEdit from './components/ProfileEdit';

// function App() {
//   return (
//     <div className="flex flex-col min-h-screen">
//       <Header />
//       <main className="flex-grow">
//         <Hero></Hero>
//         <Features></Features>
//         <Working></Working>
//         <Support></Support>
//       </main>
//       <Footer />
//     </div>
//   );
// }

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <div className='h-full w-full flex items-center justify-center'>
          <ProfileEdit/>
        </div>
      </main>
      <Footer />
    </div>
  );
}



export default App;
