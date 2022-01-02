import { Button, Paper, Table, TableBody, TableCell, TableHead, TableRow, TableContainer, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../app/stores/store';
import { Link } from 'react-router-dom';


export default observer(function BrandListTable() {
    const { brandStore } = useStore();
    const { brandsSorted } = brandStore;



    return (
        <>

            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                <Typography component="h2" variant="h6" color="primary" gutterBottom>
                    Brands
                </Typography>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>GUID</TableCell>

                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {brandsSorted.map((brand) => (
                            <TableRow key={brand.id}>
                                <TableCell>{brand.name}</TableCell>
                                <TableCell>{brand.description}</TableCell>
                                <TableCell>{brand.id}</TableCell>
                                <TableCell sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    <Button
                                        variant="text"
                                        color="error"
                                        onClick={() => brandStore.deleteBrand(brand.id)}
                                        sx={{ mr: 1 }}
                                    >
                                        Delete
                                    </Button>
                                    <Button component={Link} to={`/editBrand/${brand.id}`} variant="text" >
                                        Edit
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

            </Paper>


        </>

    )
})
