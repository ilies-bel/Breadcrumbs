insert into interview_tips (ranking, title, description) values (2, 'Visit our website', '---');
insert into interview_tips (ranking, title, description) values (2, 'Gather insight on the position', 'Go on our Career Page, blogs and social media and gather as much insights on the position you are applying to. Show us that you know what you are talking about');
insert into interview_tips (ranking, title, description) values (2, 'Try to climb Redline', 'Redline is a really tall mountain.');
insert into interview_tips (ranking, title, description) values (2, 'Prepare questions in advance', '---');
insert into interview_tips (ranking, title, description) values (2, 'Gather your documents', '---');
insert into interview_tips (ranking, title, description) values (2, 'Anticipate', '---');
insert into interview_tips (ranking, title, description) values (2, 'Get in positive mindset', '---');

insert into interview_milestones (interview_type, milestone_name, status) values ('Phone Call', 'Step 1', 'inProgress');
insert into interview_milestones (interview_type, milestone_name, status) values ('Motivation interview', 'Step 2', 'pending');
insert into interview_milestones (interview_type, milestone_name, status) values ('Technical test', 'Step 3', 'pending');
insert into interview_milestones (interview_type, milestone_name, status) values ('Ambition test', 'Step 4', 'pending');

insert into interview_type (title, description, time_length, field) values ('Phone Call', 'A quick call to give you the opportunity to give your opinion', 15, 'HR coordinator');
insert into interview_type (title, description, time_length, field) values ('Motivation interview', 'The first meeting.', 15, 'Marketing manager');
insert into interview_type (title, description, time_length, field) values ('Technical test', 'A quick skill test', 15, 'Software analyst');

insert into Users (first_name, last_name, email, role, password) values ('candidate', 'be', 'candidate@breadcrumbs.com', 'candidate', 'password');
insert into Users (first_name, last_name, email, role, password) values ('collaborator', 'beldjilali', 'collaborator@breadcrumbs.com', 'collaborator', 'password');
insert into Users (first_name, last_name, email, role, password) values ('supervisor', 'be', 'supervisor@breadcrumbs.com', 'supervisor', 'password');
insert into Users (first_name, last_name, email, role, password) values ('another', 'candidate', 'another.candidate@breadcrumbs.com', 'candidate', 'password');
insert into Users (first_name, last_name, email, role, password) values ('third', 'candidate', 'another.third@breadcrumbs.com', 'candidate', 'password');