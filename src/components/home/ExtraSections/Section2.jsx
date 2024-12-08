import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Section2 = () => {
    return (
        <div className="w-11/12 mx-auto">
            <h2 className="text-2xl text-[#1f9797] font-bold text-left">Frequently Asked Questions</h2>

            <div className='mt-10 space-y-4'>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                        className='text-xl'
                    >
                        How can I add a movie to my favorites?
                    </AccordionSummary>
                    <AccordionDetails className='text-sm'>
                        To add a movie to your favorites, simply navigate to the movie&apos;s detail page and click on the &quot;Add to Favorite&quot; button. This will save the movie to your personal favorites list, which you can access anytime from the &quot;My Favorites&quot; section.
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2-content"
                        id="panel2-header"
                        className='text-xl'
                    >
                        How do I delete a movie from my list?
                    </AccordionSummary>
                    <AccordionDetails className='text-sm'>
                        To delete a movie from your list, go to the movie&apos;s detail page and click on the &quot;Delete&quot; button. Confirm the deletion in the pop-up prompt. Once confirmed, the movie will be removed from your list.
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel3-content"
                        id="panel3-header"
                        className='text-xl'
                    >
                        What genres of movies are available on this site?
                    </AccordionSummary>
                    <AccordionDetails className='text-sm'>
                        Our website offers a wide variety of movie genres, including Action, Comedy, Drama, Fantasy, Horror, Sci-Fi, and many more. You can explore movies from different genres by using the filter options available on the movies page.
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel3-content"
                        id="panel3-header"
                        className='text-xl'
                    >
                        How can I update the details of a movie I added?
                    </AccordionSummary>
                    <AccordionDetails className='text-sm'>
                        To update the details of a movie you added, go to the movie&apos;s detail page and click on the &quot;Edit&quot; button. Make the necessary changes in the form and save the updates. The movie details will be updated accordingly.
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel3-content"
                        id="panel3-header"
                        className='text-xl'
                    >
                        What should I do if I encounter an issue while using the website?
                    </AccordionSummary>
                    <AccordionDetails className='text-sm'>
                        If you encounter any issues while using our website, please visit the &quot;Contact Us&quot; page and provide details about the problem. Our support team will get back to you as soon as possible to assist you. You can also check the &quot;Help&quot; section for troubleshooting tips.
                    </AccordionDetails>
                </Accordion>
            </div>
        </div>
    );
};

export default Section2;