import React from 'react';

import Stack from '@mui/material/Stack';

import { useAppSelector } from '@/redux/hook';

import DetailCompanyList from './company/DetailCompanyList';

export default function DetailCompany() {
    const companyDetail = useAppSelector((state) => state.companyDetail);
    const [company, setCompany] = React.useState<CompanyInfo[]>([]);

    React.useEffect(()=> {
        setCompany(companyDetail);
    },[companyDetail])
    
    return (
        <Stack direction='column'>
            {companyDetail && <DetailCompanyList company={company}/>}
        </Stack>           
    )
}