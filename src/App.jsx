import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

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

import useScrollToHash from './utils/useScrollToHash';
function ScrollToHashWrapper() {
  useScrollToHash();
  return null;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToHashWrapper /> {/*Wrapper component*/}
      <Routes>
        <Route 
          path="/" 
          element={<SignIn />
          }
        />
        <Route
          path="/home"
          element={
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow">
                <Hero />
                <div id="features"><Features /></div>
                <div id="how-it-works"><Working /></div>
                <div id="support"><Support /></div>
              </main>
              <Footer />
            </div>
          }
        />
        <Route 
          path="/profile" 
          element={
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow">
                <ProfileEdit/>
              </main>
              <Footer />
            </div>
          }
        />
        <Route 
          path="/room/:roomId" 
          element={
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow">
                <Room/>
              </main>
              <Footer />
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}


export default App;
