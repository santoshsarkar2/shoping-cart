// ProfilePage.jsx
import React, { useState, useEffect } from 'react';
import {
    Avatar,
    Box,
    Card,
    CardContent,
    Typography,
    IconButton,
    Stack,
} from '@mui/material';
import { Email, LinkedIn, GitHub, LocationOn } from '@mui/icons-material';
import { getProfile } from '../../Services/authService'
import { Link } from 'react-router-dom';

const Profile = () => {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const data = await getProfile(); // Call the imported function
            setProfile(data);
        }
        fetchData();
    }, []);
    
    //console.log("Profile Data: ", profile);
    
    


    if (!profile) {
        return <Typography variant="h6" align="center">Loading...</Typography>;
    } else {


        return (
            <div>                
                <Box
                    sx={{
                        minHeight: '80vh',
                        bgcolor: '#f5f5f5',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        p: 2,
                    }}
                >


                    <Card sx={{ maxWidth: 400, p: 3, borderRadius: 4, boxShadow: 3 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                            <Avatar
                                alt="Santosh Kumar"
                                src={profile.avatar} //"https://i.pravatar.cc/150?img=3"
                                sx={{ width: 100, height: 100 }}
                            />
                        </Box>
                        <CardContent>
                            <Typography variant="h5" align="center" gutterBottom>
                                {profile.first_name} {profile.last_name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" align="center">
                               {profile.email} <br /> Full-Stack Developer | React & Spring Boot Enthusiast
                            </Typography>

                            <Stack direction="row" justifyContent="center" spacing={1} mt={2}>
                                <LocationOn fontSize="small" />
                                <Typography variant="body2">Katihar, India</Typography>
                            </Stack>

                            <Stack direction="row" justifyContent="center" spacing={2} mt={3}>
                                <IconButton href="mailto:santosh@example.com">
                                    <Email />
                                </IconButton>
                                <IconButton href="https://github.com/santoshdev" target="_blank">
                                    <GitHub />
                                </IconButton>
                                <IconButton href="https://linkedin.com/in/santoshdev" target="_blank">
                                    <LinkedIn />
                                </IconButton>
                            </Stack>
                        </CardContent>
                        <Link to="/profile/edit" className='btn btn-danger btn-sm' >Updat</Link>
                    </Card>
                </Box>
                
            </div>
        );
    }

};

export default Profile;