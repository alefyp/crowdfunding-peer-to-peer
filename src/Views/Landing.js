import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebaseConfig";
import ReactPlayer from "react-player";

import whatsapp from "../assets/images/icons/whatsapp.svg";
import twitter from "../assets/images/icons/twitter.svg";
import facebook from "../assets/images/icons/facebook.svg";
import photoUser from "../assets/images/user.png";
import fundima from "../assets/images/abaco.svg";

import ProgressBar from "react-bootstrap/ProgressBar";

import styles from "./Landing.module.css";

export default function Landing() {
    
  const initialStateValues = {
    foundation:'',
    foundesc:'',
    type: '',
    campaignName: '' , 
    description: '',   
    url: '', 
    donations: '',
    date: '',
    campaignVideo: '',
    campaignPodcast: '',
    image: '',
    visibleDonors:'', 
  }

  let { campaingId } = useParams();
  const [campaingData, setCampaingData ] = useState(initialStateValues);

  useEffect(() => {
    if (window.AfrusForms) {
      window.AfrusForms.Inicializate()
    }
    var docRef = db.collection("campaigns").doc(campaingId);
    docRef
      .get()
      .then(function (doc) {
        if (doc.exists) {
          console.log("Document data:", doc.data());
          setCampaingData(doc.data());
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch(function (error) {
        console.log("Error getting cached document:", error);
      });
  }, [campaingId]);

  console.log(campaingData);
  
  return (
    <div className={styles.container_land}>
      <div className={styles.image_port}>
        <img src={campaingData.image}></img>
      </div>
      <div className={styles.container_info_camp}>
        <div className={styles.container_desc_camp}>
          <div className={styles.container_ima_camp}>
            <img src={photoUser}></img>
            <img src={fundima}></img>
          </div>
          <div className={styles.container_txt_camp}>
            <h4>{campaingData.campaignName}</h4>
            <p>{campaingData.description}</p>
          </div>
        </div>
        <div className={styles.container_recaudo_camp}>
          <p>$0</p>
          <p>${campaingData.donations}</p>
        </div>
        <div className={styles.container_progress_bar}>
          <ProgressBar variant="success" now={5} />
        </div>
      </div>
      <div className={styles.elementor_afrus}>
        <div
          id="afrus-container-form"
          data-form="Zm9ybS0xNTU0LW9yZ2FuaXphdGlvbi04Nw==" manual
        ></div>
      </div>
      <div className={styles.player_video}>
        <h1>Conoce más a fondo sobre la iniciativa</h1>
        <ReactPlayer
          className="react-player"
          url={campaingData.campaignVideo}
          controls={true}
          width="100%"
        />
      </div>
      <div className={styles.player_podcast}>
      <h1>Escucha el Podcast que quiero compartir sobre mi iniciativa</h1>
        <ReactPlayer
          className="react-player"
          url= "https://soundcloud.com/fundacionmedife/dr-humberto-debat-biologo?in=fundacionmedife/sets/38-2020-noviembre-28"
          controls={true}
          width="100%"
        />
      </div>
      <div className={styles.shared_sn}>
        <p>Comparte</p>
        <a href="whatsapp://send?text=texto%20con%20URL">
          <img src={whatsapp}></img>
        </a>
        <a href="https://www.facebook.com/sharer/sharer.php?u=">
          <img src={facebook}></img>
        </a>
        <a href="https://twitter.com/?status=">
          <img src={twitter}></img>
        </a>
      </div>
    </div>
  );
}
