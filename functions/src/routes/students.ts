import { Router, Request, Response } from "express";
import { db } from "../db"

const router: Router = Router();

const Student = db.collection("students")

/**
 * 
 * @api {get} /student 1. Find all students
 * @apiName findStudents
 * @apiGroup Students
 * @apiVersion  1.0.0
 * 
 * @apiSuccess (200) {Boolean} error Error status is `false`
 * @apiSuccess (200) {Object[]} students The array of student objects
 * @apiSuccess (200) {String} students.id The unique id of the student (as auto-set by firestore)
 * @apiSuccess (200) {String} students.name Student name
 * @apiSuccess (200) {Number} students.age Student age
 * @apiSuccess (200) {String} students.school Student school
 */
export const find = async (req: Request, res: Response) => {
  try {
    const students: FirebaseFirestore.QuerySnapshot = await Student.get()
    return res.json({ error: false, students: students.docs.map(doc => Object.assign({ id: doc.id }, doc.data())) })
  } catch (error) {
    return res.status(500).json({ error: true, reason: error.message })
  }
}

/**
 * 
 * @api {get} /student/:name 2. Search and get student(s) by name
 * @apiName getStudentByName
 * @apiGroup Students
 * @apiVersion  1.0.0
 * 
 * @apiSuccess (200) {Boolean} error Error status is `false`
 * @apiSuccess (200) {Object[]} students The array of student objects
 * @apiSuccess (200) {String} students.id The unique id of the student (as auto-set by firestore)
 * @apiSuccess (200) {String} students.name Student name
 * @apiSuccess (200) {Number} students.age Student age
 * @apiSuccess (200) {String} students.school Student school
 */
export const get = async (req: Request, res: Response) => {
  const { name } = req.params;
  try {
    const students: FirebaseFirestore.QuerySnapshot = await Student.where("name", "==", name).get()
    if (students.docs.length === 0) throw new Error(`No such student with name ${name}`)
    return res.json({ error: false, students: students.docs.map(doc => Object.assign({ id: doc.id }, doc.data())) })
  } catch (error) {
    return res.status(500).json({ error: true, reason: error.message })
  }
}

/**
 * 
 * @api {post} /student 3. Create a new Student
 * @apiName postStudent
 * @apiGroup Students
 * @apiVersion  1.0.0
 * 
 * @apiParam  {String} name Student's name
 * @apiParam  {Number} age Student's age
 * @apiParam  {String} school Student's school
 * 
 * @apiSuccess (200) {Boolean} error Error status is `false`
 * @apiSuccess (200) {Object} student The newly created student object
 * @apiSuccess (200) {String} student.id The unique id of the student (as auto-set by firestore)
 * @apiSuccess (200) {String} student.name Student name
 * @apiSuccess (200) {Number} student.age Student age
 * @apiSuccess (200) {String} student.school Student school
 * 
 * @apiErrorExample {JSON} Error-Response: 400
     { error: true, reason: "Missing mandatory parameters"}
 */
export const post = async (req: Request, res: Response) => {
  interface StudentInterface {
    name?: string;
    age?: number;
    school?: string
  }
  const { name, age, school }: StudentInterface = req.body;
  if (name === undefined || age === undefined || school === undefined) {
    return res.status(400).json({ error: true, reason: "Missing mandatory parameters"})
  }
  try {
    const ref: FirebaseFirestore.DocumentReference = await Student.add({ name, age, school })
    return res.json({ error: false, student: { id: ref.id, name, age, school } })
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: true, reason: error.message })
  }
}

/**
 * 
 * @api {put} /student/:id 4. Overwrite an existing Student, or create it, if not existing
 * @apiName putStudent
 * @apiGroup Students
 * @apiVersion  1.0.0
 * 
 * @apiParam  {String} id id of the Student to overwrite [URL Parameter]
 * @apiParam  {String} name Student's name
 * @apiParam  {Number} age Student's age
 * @apiParam  {String} school Student's school
 * 
 * @apiSuccess (200) {Boolean} error Error status is `false`
 * @apiSuccess (200) {Object} student The overwritten or created student object
 * @apiSuccess (200) {String} student.id The unique id of the student (as auto-set by firestore)
 * @apiSuccess (200) {String} student.name Student name
 * @apiSuccess (200) {Number} student.age Student age
 * @apiSuccess (200) {String} student.school Student school
 * 
 * @apiErrorExample {JSON} Error-Response: 400
     { error: true, reason: "Missing mandatory parameters"}
 */
export const put = async (req: Request, res: Response) => {
  interface StudentInterface {
    name?: string;
    age?: number;
    school?: string
  }
  const { id }  = req.params
  const { name, age, school }: StudentInterface = req.body;
  if (name === undefined || age === undefined || school === undefined) {
    return res.status(400).json({ error: true, reason: "Missing mandatory parameters"})
  }
  try {
    const student: FirebaseFirestore.DocumentReference = Student.doc(id)
    await student.set({ name, age, school })
    return res.json({ error: false, student: { id, name, age, school } })
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: true, reason: error.message })
  }
}

/**
 * 
 * @api {patch} /student/:id 5. Update some fields of an existing student
 * @apiName patchStudent
 * @apiGroup Students
 * @apiVersion  1.0.0
 * 
 * @apiParam  {String} id id of the Student to update [URL Parameter]
 * @apiParam  {String} [name] Student's name
 * @apiParam  {Number} [age] Student's age
 * @apiParam  {String} [school] Student's school
 * 
 * @apiSuccess (200) {Boolean} error Error status is `false`
 * @apiSuccess (200) {Object} student The updated student object
 * @apiSuccess (200) {String} student.id The unique id of the student (as auto-set by firestore)
 * @apiSuccess (200) {String} student.name Student name
 * @apiSuccess (200) {Number} student.age Student age
 * @apiSuccess (200) {String} student.school Student school
 * 
 * @apiErrorExample {JSON} Error-Response: 500
     { error: true, reason: "No such Student with id AABCD1234}"}
 */
export const patch = async (req: Request, res: Response) => {
  interface StudentInterface {
    name?: string;
    age?: number;
    school?: string
  }
  const { id }  = req.params
  const { name, age, school }: StudentInterface = req.body;
  try {
    const data: StudentInterface = {} // fields to update
    const student: FirebaseFirestore.DocumentReference = Student.doc(id)
    if (name !== undefined) data.name = name
    if (age !== undefined) data.age = age
    if (school !== undefined) data.school = school
    try {
      await student.update(data)
    } catch (error) {
      if (error.code === 5) {
        throw new Error(`No such Student with id ${id}`) // rethrow
      }
    }
    return res.json({ error: false, student: { id, name, age, school } })
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: true, reason: error.message })
  }
}

/**
 * 
 * @api {delete} /student 6. Delete a student
 * @apiDescription *Note:* On attempting to delete a non-existing student, nothing will happen (obviously!), but the API would still return success
 * @apiName deleteStudent
 * @apiGroup Students
 * @apiVersion  1.0.0
 * 
 * 
 * @apiParam  {String} id id of the Student to delete [URL Parameter]
 * 
 * @apiSuccess (200) {Boolean} error Error status is `false`
 * @apiSuccess (200) {String} id The unique id of the student that was (attempted to be) deleted
 */
export const remove = async (req: Request, res: Response) => {
  const { id }  = req.params
  try {
    const student: FirebaseFirestore.DocumentReference = Student.doc(id)
    await student.delete()
    return res.json({ error: false, id })
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: true, reason: error.message })
  }
}
