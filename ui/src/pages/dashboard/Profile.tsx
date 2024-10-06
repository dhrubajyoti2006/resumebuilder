import {DashboardContent} from "../../layouts/dashboard";
// import {CustomBreadcrumbs} from 'src/components/custom-breadcrumbs';
import Divider from "@mui/material/Divider";
import CardHeader from "@mui/material/CardHeader";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";

import {UserDetailsSection} from "./UserDetailsSection";
import ExperienceSection from "./ExperienceSection";
import EducationSection from './EducationSection';
import SkillSection from './SkillSection';
import CertificationSection from './CertificationSection';

// Import the data from the data file
// import {profileData} from "./data/profileData";
import {ProfileApiCall} from "../../apiCall/profile/ProfileApiCall";
import {useEffect, useState} from "react";
// import {useEffect, useState} from "react";


export default function Profile() {
  // States for storing data, loading and error states
  const [profileData, setProfileData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Call the ProfileApiCall.get method
        const data = {}; // Replace this with any data you need to pass
        const context = {}; // Replace this with actual context if needed
        const response = await ProfileApiCall.get(data, context);
        setProfileData(response.data);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to fetch profile data');
        setIsLoading(false);
      }
    };

    // Trigger the data fetching when the component mounts
    fetchData();
  }, []);

  // Handle loading state
  if (isLoading) return <div>Loading...</div>;

  // Handle error state
  if (error) return <div>{error}</div>;
  return (
    <DashboardContent>
       {/*<CustomBreadcrumbs*/}
       {/* heading="Profile"*/}
       {/* links={[{name: ''}]}*/}
       {/*/>*/}

       {/*<Card sx={{p: 3, mb: 3}}>*/}
       {/* <UserDetailsSection data={profileData.headerData}/>*/}
       {/*</Card>*/}

       <Card sx={{mb: 3}}>
        <CardHeader title="Experience" sx={{mb: 3}}/>
        <Divider/>
        <Stack spacing={1.5}>
          <ExperienceSection data={profileData.sections.find(section => section.key === 'Experience').items}/>
        </Stack>
       </Card>

       <Card sx={{mb: 3}}>
        <CardHeader title="Education" sx={{mb: 3}}/>
        <Divider/>
        <Stack spacing={1.5}>
          <EducationSection data={profileData.sections.find(section => section.key === 'Education').items}/>
        </Stack>
       </Card>

       <Card sx={{mb: 3}}>
        <CardHeader title="Skills" sx={{mb: 3}}/>
        <Divider/>
        <Stack spacing={1.5}>
          <SkillSection data={profileData.sections.find(section => section.key === 'Skills').content}/>
        </Stack>
       </Card>

       <Card sx={{mb: 3}}>
        <CardHeader title="Certification" sx={{mb: 3}}/>
        <Divider/>
        <Stack spacing={1.5}>
          <CertificationSection data={profileData.sections.find(section => section.key === 'Certification').items}/>
        </Stack>
       </Card>
    </DashboardContent>
  );
}
