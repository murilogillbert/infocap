/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import videoData from '../../jsons/videos.json';
import cursoData from '../../jsons/cursos.json';
import './Video.css';

const Video = () => {
  const { id, videoId } = useParams();
  const curso = cursoData.find(curso => curso.id === parseInt(id));
  const video = videoData.find(video => video.id === parseInt(videoId));
  const videos = videoData.filter(video => video.cursoId === parseInt(id));

  const [videoDetails, setVideoDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideoDetails = async () => {
      if (video && video.url) {
        const videoId = new URL(video.url).searchParams.get("v");

        console.log( new URL(video.url).searchParams.get("v"))
        if (videoId) {
          const API_KEY = 'AIzaSyC1NiFmuwkRAbs3bVu-HKA9SXCEk0yWzxc';
          const apiUrl = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${API_KEY}&part=snippet,contentDetails,statistics`;

          try {
            const response = await axios.get(apiUrl);
            const videoData = response.data.items[0];

            setVideoDetails({
              title: videoData.snippet.title,
              description: videoData.snippet.description,
              thumbnail: videoData.snippet.thumbnails.high.url,
              duration: videoData.contentDetails.duration,
              publishedAt: videoData.snippet.publishedAt,
              tags: videoData.snippet.tags || []
            });
            setLoading(false);
          } catch (error) {
            console.error('Error fetching video details:', error);
            setLoading(false);
          }
        }
      }
    };

    fetchVideoDetails();
  }, [video]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!video) {
    return <div>Vídeo não encontrado</div>;
  }

  //https://www.youtube.com/embed/${new URL(video.url).searchParams.get("v")}?controls=1
  return (
    <div className="video-page-container">
      <div className="video-content">
        <h2>{videoDetails?.title || video.titulo}</h2>
        <iframe src={`https://www.youtube.com/embed/${new URL(video.url).searchParams.get("v")}?controls=1`} allowFullScreen title={videoDetails?.title || video.titulo}>
          Seu navegador não suporta o elemento de vídeo.
        </iframe>
        {videoDetails && (
          <div className="video-details">
            <p className="description">{videoDetails.description}</p>
            <p><strong>Publicado em:</strong> {new Date(videoDetails.publishedAt).toLocaleDateString()}</p>
          </div>
        )}
      </div>
      <div className="video-list">
        <h3>Outros Vídeos do Curso</h3>
        <ul>
          {videos.map((video) => (
            <li key={video.id}>
              <Link to={`/cursos/${id}/video/${video.id}`}>{video.titulo}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Video;

