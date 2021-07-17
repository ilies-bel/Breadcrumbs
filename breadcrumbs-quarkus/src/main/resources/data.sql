insert into interview_tips ("id", ranking, title, description) values (1, 2, 'Visit our website', '---');
insert into interview_tips ("id", ranking, title, description) values (2, 2, 'Gather insight on the position', 'Go on our Career Page, blogs and social media and gather as much insights on the position you are applying to. Show us that you know what you are talking about');
insert into interview_tips ("id", ranking, title, description) values (3, 2, 'Try to climb Redline', 'Redline is a really tall mountain.');
insert into interview_tips ("id", ranking, title, description) values (4, 2, 'Prepare questions in advance', '---');
insert into interview_tips ("id", ranking, title, description) values (5, 2, 'Gather your documents', '---');
insert into interview_tips ("id", ranking, title, description) values (6, 2, 'Anticipate', '---');
insert into interview_tips ("id", ranking, title, description) values (7, 2, 'Get in positive mindset', '---');

insert into interview_milestones (interview_processes, interview_type, milestone_name, status) values ('Process', 'Phone Call', 'Step 1', 'inProgress');
insert into interview_milestones (interview_processes, interview_type, milestone_name, status) values ('Process', 'Motivation interview', 'Step 2', 'pending');
insert into interview_milestones (interview_processes, interview_type, milestone_name, status) values ('Process', 'Technical test', 'Step 3', 'pending');
insert into interview_milestones (interview_processes, interview_type, milestone_name, status) values ('Process', 'Ambition test', 'Step 4', 'pending');

insert into interview_type (title, description, time_length, field) values ('Phone Call', 'A quick call to give you the opportunity to give your opinion', 15, 'HR coordinator');
insert into interview_type (title, description, time_length, field) values ('Motivation interview', 'The first meeting.', 15, 'Marketing manager');
insert into interview_type (title, description, time_length, field) values ('Technical test', 'A quick skill test', 15, 'Software analyst');

insert into Users (first_name, last_name, email, role, password) values ('candidate', 'be', 'candidate@breadcrumbs.com', 'candidate', 'password');
insert into Users (first_name, last_name, email, role, password) values ('collaborator', 'be', 'collaborator@breadcrumbs.com', 'collaborator', 'password');
insert into Users (first_name, last_name, email, role, password) values ('supervisor', 'be', 'supervisor@breadcrumbs.com', 'supervisor', 'password');