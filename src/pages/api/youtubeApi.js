import axios from 'axios';

export default async function handler(req, res) {
    const { query: { searchQuery, playlistId } } = req;

    try {
        // Search for a video
        const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&type=video&q=${searchQuery}&key=${process.env.YOUTUBE_API_KEY}`;
        const searchResponse = await axios.get(searchUrl);
        //auth

        // Add the first video result to the playlist
        const videoId = searchResponse.data.items[0].id.videoId;
        const playlistUrl = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${process.env.YOUTUBE_API_KEY}`;
        const playlistData = {
            snippet: {
                playlistId: "PL4qRvfkki_9ODbOF87y4RN9orK6DOSBjO",
                resourceId: {
                    videoId,
                },
            },
        };
        const playlistResponse = await axios.post(playlistUrl, playlistData);

        res.status(200).json({ message: 'Video added to playlist!', data: playlistResponse.data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error adding video to playlist', error });
    }
}