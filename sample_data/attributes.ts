import { BusinessAttributes } from "../models/business";
import { DepartmentAttributes } from "../models/department";
import { ContentAttributes } from "../models/manual/content";
import { ManualAttributes } from "../models/manual/manual";
import { ManualAssignmentAttributes } from "../models/manual/manual_assignment";
import { PolicyAttributes } from "../models/manual/policy";
import { ReadAttributes } from "../models/manual/read";
import { SectionAttributes } from "../models/manual/section";
import { SectionAttributes as QuizSectionAttributes } from "../models/quiz/section";
import { PermissionAttributes } from "../models/permission";
import { QuestionAttributes } from "../models/quiz/question";
import { QuizAttributes } from "../models/quiz/quiz";
import { RoleAttributes } from "../models/role";
import { UserAttributes } from "../models/user/user";
import { UserRoleAttributes } from "../models/user/user_role";
import { AnswerAttributes } from "../models/quiz/answer";
import { AttemptAttributes } from "../models/quiz/attempt";
import { ResultAttributes } from "../models/quiz/result";
import { EventAttributes } from "../models/event";

// Configuration
export const businessAttributes: BusinessAttributes = {
    name: "Oakville Windows & Doors",
    code: "Oakville3294",
    email: "varghese.noah@gmail.com",
    phone: "9053393294",
    address: "1380 Speers Rd",
    city: "Oakville",
    province: "ON",
    country: "CA",
    postal_code: "L6H1X1",
};

export const userAttributes: UserAttributes = {
    first_name: "Noah",
    last_name: "Varghese",
    email: "varghese.noah@gmail.com",
    password: "password",
    address: "207 Elderwood Trail",
    city: "Oakville",
    postal_code: "L6H1X1",
    province: "ON",
    country: "CA",
    birthday: new Date("1996-08-07"),
    phone: "9053393294",
    business_id: -1,
};

export const departmentAttributes: DepartmentAttributes = {
    name: "Management",
    business_id: 1,
    updated_by_user_id: -1,
};

export const permissionAttributes: PermissionAttributes = {
    edit_policies: true,
    add_users: true,
    edit_users: true,
    remove_users: true,
    updated_by_user_id: -1,
    view_users: true,
};

export const roleAttributes: RoleAttributes = {
    name: "Manager",
    department_id: -1,
    permission_id: -1,
    updated_by_user_id: -1,
};

export const userRoleAttributes: UserRoleAttributes = {
    user_id: -1,
    role_id: -1,
    updated_by_user_id: -1,
};

export const manualAttributes: ManualAttributes = {
    title: "Manual",
    role_id: -1,
    department_id: -1,
    updated_by_user_id: -1,
};

export const manualAssignmentAttributes: ManualAssignmentAttributes = {
    department_id: -1,
    manual_id: -1,
    role_id: -1,
    updated_by_user_id: -1,
};

export const sectionAttributes: SectionAttributes = {
    title: "Section",
    manual_id: -1,
    updated_by_user_id: -1,
};

export const policyAttributes: PolicyAttributes = {
    title: "Policy",
    section_id: -1,
    updated_by_user_id: -1,
};

export const contentAttributes: ContentAttributes = {
    title: "Content",
    content: "Here are some words",
    policy_id: -1,
    updated_by_user_id: -1,
};

export const readAttributes: ReadAttributes = {
    policy_id: -1,
    user_id: -1,
};

export const quizAttributes: QuizAttributes = {
    title: "Quiz",
    max_attempts: 5,
    manual_id: -1,
    updated_by_user_id: -1,
};

export const quizSectionAttributes: QuizSectionAttributes = {
    title: "Section",
    updated_by_user_id: -1,
    quiz_id: -1,
};

export const questionAttributes: QuestionAttributes = {
    question: "Question",
    type: "radio",
    quiz_section_id: -1,
    updated_by_user_id: -1,
};

export const answerAttributes: AnswerAttributes = {
    answer: "Answer",
    correct: false,
    quiz_question_id: -1,
    updated_by_user_id: -1,
};

export const attemptAttributes: AttemptAttributes = {
    quiz_id: -1,
    user_id: -1,
};

export const resultAttributes: ResultAttributes = {
    quiz_answer_id: -1,
    quiz_attempt_id: -1,
    quiz_question_id: -1,
};

export const eventAttributes: EventAttributes = {
    name: "Event",
    status: "FAIL",
    user_id: null,
    business_id: null,
};
