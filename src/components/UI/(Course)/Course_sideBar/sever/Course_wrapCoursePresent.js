import AIR_BoxCourse from "@/components/UI/(Course)/AIR_BoxCourse"
import Grid from "@mui/material/Grid"

export default function Course_wrapCoursePresent({ data }) {
  console.log(data);

  return (
    <Grid container spacing={2}>
      {data.map(e => (
        <Grid key={e.ID} item xs={3}><AIR_BoxCourse data={e} /></Grid>
      ))}
    </Grid>
  )
}