import PostCourse from "../../../models/postCourse";
import PostModel from "../../../models/postTask";
import connectDB from "../../../config/database";

export async function POST(request) {
  await connectDB();
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    let newStudent = await request.json();
    const datas = await PostCourse.findOne({ _id: id });
    let attribute = {}
    datas.Detail.forEach(e => { attribute[e.ID] = { Checkin: 0, Cmt: '', Note: '' } });

    for (let i in newStudent) {
      let g = await PostModel.findByIdAndUpdate(newStudent[i]._id, {
        Course: {
          [datas.ID]: {
            StatusLearn: false,
            StatusPay: datas.Price
          }
        }
      }, { new: true })
      newStudent[i].Name = g.Name
      newStudent[i].Learn = attribute
    }
    var dataStudent = []
    datas.Student ?
      dataStudent = await PostCourse.findByIdAndUpdate(id, { Student: newStudent.concat(datas.Student) }, { new: true }) :
      dataStudent = await PostCourse.findByIdAndUpdate(id, { Student: newStudent }, { new: true })
    return new Response(JSON.stringify(dataStudent), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}