import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";


export default function BrandHeader() {



    return (
        <Box sx={{ mb: 5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h4" gutterBottom>
                        Brands
                    </Typography>
                </Box>

                <Box sx={{ flexShrink: 0 }}>
                    <Button component={Link} to="/createBrand" variant="contained">New Brand</Button>
                </Box>
            </Box>

            
        </Box>

    )
}