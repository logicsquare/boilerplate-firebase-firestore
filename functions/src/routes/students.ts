import { Router, Request, Response } from "express";
import { db } from "../db"

const router: Router = Router();

const Student = db.collection("students")

export const find = async (req: Request, res: Response) => {
  try {
    const students: FirebaseFirestore.QuerySnapshot = await Student.get()
    return res.json({ error: false, students: students.docs.map(doc => Object.assign({ id: doc.id }, doc.data())) })
  } catch (error) {
    return res.status(500).json({ error: true, reason: error.message })
  }
}

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

export const post = async (req: Request, res: Response) => {
  interface StudentInterface {
    name?: string;
    age?: number;
    school?: string
  }
  const { name, age, school }: StudentInterface = req.body;
  if (name === undefined || age === undefined || school === undefined) {
    return res.status(400).json({ error: true, reason: "MIssing mandatory parameters"})
  }
  try {
    const ref: FirebaseFirestore.DocumentReference = await Student.add({ name, age, school })
    return res.json({ error: false, student: { id: ref.id, name, age, school } })
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: true, reason: error.message })
  }
}

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
    await student.update(data)
    return res.json({ error: true, student: { id, name, age, school } })
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: true, reason: error.message })
  }
}

export const remove = async (req: Request, res: Response) => {
  const { id }  = req.params
  try {
    const student: FirebaseFirestore.DocumentReference = Student.doc(id)
    await student.delete()
    return res.json({ error: true, id })
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: true, reason: error.message })
  }
}
