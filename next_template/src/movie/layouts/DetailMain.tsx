import React from 'react';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2/Grid2';

import { getCompanyDetail, getDetail } from '../components/FetchData';
import { useAppDispatch } from '@/redux/hook';
import { usePathname } from 'next/navigation';
import { delCompanyInfo, setCompanyInfo, setDetailInfo, setInitialize } from '@/redux/features/movieReducer';

import DetailTop from '../components/detail/DetailTop';
import DetailMiddle from '../components/detail/DetailMiddle';
import DetialModal from '../components/detail/DetailModal';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import DetailCredits from '../components/detail/DetailCredits';
import DetailCompany from '../components/detail/DetailCompany';


export default function DetailMain() {
    const dispatch = useAppDispatch()
    const pathArray = usePathname().split('/');
    const movieId = pathArray[pathArray.length - 1]
    const [tabIndex, setTabIndex] = React.useState(0)

    React.useEffect(()=> {
        dispatch(setInitialize())
        dispatch(delCompanyInfo())
        fetchDetailFn(movieId)
            .then((ids)=> { 
                fetchCompanyDetailFn(ids)
            })
    },[])

    const fetchDetailFn = async (id : string)=> {
        const ids = []
        try {
            await getDetail(id).then((results: MovieDetail)=> {
                results.credits.cast.map((cast) => {
                    cast.kind = "Cast"
                })
                results.credits.crew.map((crew) => {
                    crew.kind = "Crew";
                })
                dispatch(setDetailInfo(results))
                results.production_companies.map((item) => {
                    ids.push(item.id)
                })
            }) 
        } catch(err) {
            console.log(err)
            throw new Error('Error in Fetch Movie Detail')
        } finally {
            return ids;
        }
    }

    const fetchCompanyDetailFn = async (ids : string[]) => {
        try { 
            ids.map(async (id)=> {
                await getCompanyDetail(id).then((results : CompanyInfo)=> {
                    dispatch(setCompanyInfo(results))
                }) 
            })
        } catch (err) {
            console.log(err);
            throw new Error('Error in Fetch Movie Detail')
        } 
    }

    const onTabChange = (event:React.SyntheticEvent, newIndex: number) => {
        setTabIndex(newIndex)
    }

    return (
        <Container maxWidth="lg" sx={{mt : "5rem", maxWidth : "80vw" }}>
            <Grid xs={12} sx={{width : "100%"}}>
                <DetailTop />
            </Grid>
            <Grid xs={12} sx={{width : "100%"}}>
                <Tabs value={tabIndex} onChange={onTabChange}>
                    <Tab label="Detail" value={0} />
                    <Tab label="Credit" value={1}/>
                    <Tab label="Production" value={2} />
                </Tabs>
                { tabIndex === 0 && <DetailMiddle />}
                { tabIndex === 1 && <DetailCredits />}
                { tabIndex === 2 && <DetailCompany />}
            </Grid>
            <DetialModal/>
        </Container>
    )
    
}