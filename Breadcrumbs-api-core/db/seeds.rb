# frozen_string_literal: true
users = User.create!([
                       {
                         first_name: 'candidate',
                         last_name: 'beldjilali',
                         email: 'candidate@breadcrumbs.com',
                         role: 'candidate',
                         push_notification: true,
                         mail_notification: true,
                         password: "password"

                       },
                       {
                         first_name: 'collaborator',
                         last_name: 'beldjilali',
                         email: 'collaborator@breadcrumbs.com',
                         role: 'collaborator',
                         push_notification: true,
                         mail_notification: true,
                         password: "password"

                       },
                       {
                         first_name: 'supervisor',
                         last_name: 'beldjilali',
                         email: 'supervisor@breadcrumbs.com',
                         role: 'supervisor',
                         push_notification: true,
                         mail_notification: true,
                         password: "password"
                       },
                       {
                         first_name: 'ambassador',
                         last_name: 'beldjilali',
                         email: 'ambassador@breadcrumbs.com',
                         role: 'ambassador',
                         push_notification: true,
                         mail_notification: true,
                         password: "password"

                       },
                       {
                         first_name: 'admin',
                         last_name: 'beldjilali',
                         email: 'admin@breadcrumbs.com',
                         role: 'admin',
                         push_notification: true,
                         mail_notification: true,
                         password: "password"

                       }
                     ])



interview_processes = InterviewProcess.create!([{ process_name: 'Default', template: 'true' }])

business_field = BusinessField.create!([{ field_name: "General", description: "General field" },
                                        { field_name: "Engineering", description: "Doing stuff with computers" },
                                        { field_name: "Operational", description: "Make sure everything goes smoothly" },
                                        { field_name: "Marketing", description: "Bring leads" },
                                        { field_name: "Sales", description: "Make client buy" }])

business_titles = BusinessTitle.create!([{ business_field: business_field[3], title: "Marketing manager", description: "Bring people to the brand" },
                                         { business_field: business_field[1], title: "Front-end developper", description: "Make beautiful websites" },
                                         { business_field: business_field[1], title: "Software analyst", description: "Analyse..." },
                                         { business_field: business_field[2], title: "HR coordinator", description: "Search for talents" }])

interview_type = InterviewType.create!([{ business_field: business_field.first,
                                          title: "Phone call",
                                          description: "A quick call to give you the opportunity to give your opinion",
                                          estimated_time_length: 3000,
                                          min_time_before_next: 1500,
                                        },
                                        { business_field: business_field.first,
                                          title: "Cognitive test",
                                          description: "Analyze your ability to think quickly",
                                          estimated_time_length: 6000,
                                          min_time_before_next: 2500,
                                        },
                                        { business_field: business_field.second,
                                          title: "Technical test",
                                          description: "A quick skill test",
                                          estimated_time_length: 6000,
                                          min_time_before_next: 2500,
                                        },
                                        { business_field: business_field.first,
                                          title: "Interview",
                                          description: "A talk with the CEO",
                                          estimated_time_length: 6000,
                                          min_time_before_next: 2500,
                                        }
                                       ])

InterviewMilestone.create!([{
                              interview_process: interview_processes.first,
                              interview_type: interview_type.first,
                              milestone_name: 'Step 1'
                            },
                            {
                              interview_process: interview_processes.first,
                              interview_type: interview_type.first,
                              milestone_name: 'Step 2'
                            },
                            {
                              interview_process: interview_processes.first,
                              interview_type: interview_type.first,
                              milestone_name: 'Step 3'
                            }
                           ])

candidate = Candidate.create!([
                                {
                                  user: users.first,
                                  interview_process: interview_processes.first,
                                  business_title: business_titles.first,
                                }
                              ])

collaborator = Collaborator.create!([
                                {
                                  user: users.second,
                                  office_id: interview_processes.first,
                                  business_title: business_titles.first,
                                }
                              ])




























Theme.create!([{ primary_color: '3572F1', secondary_color: 'F24E95', logo_url: 'https://upload.wikimedia.org/wikipedia/commons/0/05/PricewaterhouseCoopers_Logo.svg', splash_logo_url: 'https://d1fmx1rbmqrxrr.cloudfront.net/cnet/optim/i/edit/2019/04/eso1644bsmall__w770.jpg' }])

InterviewTip.create!([{ title: 'Visit our website', description: '---', ranking: 1 },
                      { title: 'Gather insight on the position', description: 'Go on our Career Page, blogs and social media and gather as much insights on the position you are applying to. Show us that you know what you are talking about', ranking: 2 },
                      { title: 'Think about your career goals', description: '---', ranking: 3 },
                      { title: 'Prepare questions in advance', description: '---', ranking: 4 },
                      { title: 'Gather your documents', description: '---', ranking: 5 },
                      { title: 'Anticipate', description: '---', ranking: 6 },
                      { title: 'Get in positive mindset', description: '---', ranking: 7 },
                      { title: 'Put your strengths forward', description: '---', ranking: 8 },
                      { title: 'Write down your questions', description: '----', ranking: 9 },
                      { title: 'Clean up your e-reputation', description: '------', ranking: 10 },
                     ])