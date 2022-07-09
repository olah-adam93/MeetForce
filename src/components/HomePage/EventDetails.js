import { useState, useEffect } from 'react';

/*Firebase*/
import { storage } from '../../config/firebase';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';

/* CRUD */
import { readData } from '../../services/crud';

const EventDetails = ({ eventInfo, eventId }) => {
  const [attendeesNb, setAttendeesNb] = useState([]);
  const [attendeesNm, setAttendeesNm] = useState([]);
  const [mouseState, setMouseState] = useState(false);
  const [targetName, setTargetName] = useState();

  useEffect(() => {
    readData('eventAttendees', eventId)
      .then((snapshot) => {
        const EventList = Object.values(snapshot.val() || {});
        console.log(EventList);
        return EventList;
      })
      .then((snap_1) => {
        const userIdList = snap_1;
        const userIdList2 = Object.keys(userIdList);
        const userNameList = Object.values(userIdList);

        setAttendeesNm(userNameList);
        setAttendeesNb(userIdList2.length);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  // Attendees number //
  console.log(attendeesNb);

  // Attendees name //
  console.log(attendeesNm);

  // Attendees AvatarList //

  const userAvatar = {
    'Tracie Chicoine':
      'https://firebasestorage.googleapis.com/v0/b/meet-force.appspot.com/o/userAvatar%2FMbjV9nHNq7guYSWADlRJzCQPUxe2?alt=media&token=f0c00be4-a8b6-46c1-8946-149ddcdf146f',
    'Annmarie Linek':
      'https://firebasestorage.googleapis.com/v0/b/meet-force.appspot.com/o/userAvatar%2Fxu1HflPSZEeulML57fktlTzOcM83?alt=media&token=7c70de30-d100-47a2-a5d3-34109a9cbfc2',
    'Devin Sekona':
      'https://firebasestorage.googleapis.com/v0/b/meet-force.appspot.com/o/userAvatar%2FzOKclHpCtWYXj0dIOAMv9lDwLlO2?alt=media&token=75b4f255-58c7-434c-9cb6-221656ddc544',
    Richard:
      'https://firebasestorage.googleapis.com/v0/b/meet-force.appspot.com/o/userAvatar%2FsIMwnOds5lcSFZBwg5MrjPu6FWs2?alt=media&token=3a287ced-d99f-4d04-b303-49b8f53babf3',
    Boris:
      'https://firebasestorage.googleapis.com/v0/b/meet-force.appspot.com/o/userAvatar%2FzaQKqjp3cNaHWvCywxJGRcd2Gyv2?alt=media&token=a9338155-b800-4606-b2da-e52f6d3e735f',
    Erika:
      'https://firebasestorage.googleapis.com/v0/b/meet-force.appspot.com/o/userAvatar%2F9EIlbokrBPQwRtDpFKCnXK7lPOI2?alt=media&token=f175eacb-3ce8-480a-9e27-0f1ad0757ddf',
    Carolina:
      'https://firebasestorage.googleapis.com/v0/b/meet-force.appspot.com/o/userAvatar%2FvGkgbCGkBYdcbx1EQcAgjzZWcnN2?alt=media&token=b5fcd05a-a0d8-4c0d-8f04-1ff1d3b03616',
    Martin:
      'https://firebasestorage.googleapis.com/v0/b/meet-force.appspot.com/o/userAvatar%2FYf5vmh7eBHdEpSm6CiZPBdJkGVh1?alt=media&token=3a836c26-a621-4d80-8ccf-86be771b4925',
    'Keira Tonkinson':
      'https://firebasestorage.googleapis.com/v0/b/meet-force.appspot.com/o/userAvatar%2FIuDIgzaCcRNKZc4qZOmNOsKyYF13?alt=media&token=40b48d9c-0d76-49fd-a0cf-51ecb9203cad',
    Jacob:
      'https://firebasestorage.googleapis.com/v0/b/meet-force.appspot.com/o/userAvatar%2FdhtviH5wfEYfucFXoghFcLfxdni1?alt=media&token=2dc98663-4486-4ec6-ba5b-c6198d341122',
    Wiliemae:
      'https://firebasestorage.googleapis.com/v0/b/meet-force.appspot.com/o/userAvatar%2FrH8DuGIteYVdxalmokkvgDBZHCr2?alt=media&token=9a08ce93-4d5f-4adc-99a4-2edfac98c0c2',
    'Vena Luisa':
      'https://firebasestorage.googleapis.com/v0/b/meet-force.appspot.com/o/userAvatar%2Fim6hx5fsbhYP8pTvjJztSLhTRFD3?alt=media&token=e57685e7-5c7b-4568-ade8-97b7c55dd018',
    Lillia:
      'https://firebasestorage.googleapis.com/v0/b/meet-force.appspot.com/o/userAvatar%2FZOwiPsYYnueD6IFsMVphIxfvgUM2?alt=media&token=fbe8e541-f6a5-47fb-b72e-b7ac3dcbf786',
    Stacie:
      'https://firebasestorage.googleapis.com/v0/b/meet-force.appspot.com/o/userAvatar%2FHt1JUMLvGBSMp2oWyXZSxxzhE762?alt=media&token=050627c7-e5f3-46fa-a5c5-f4b5cd464e6e',
    Damion:
      'https://firebasestorage.googleapis.com/v0/b/meet-force.appspot.com/o/userAvatar%2Fz4UiIqdgUXdlKkUcrPOuSDKJtsy2?alt=media&token=5b96738f-2cf9-4166-9a8b-2d782442b7c9',
    Salvador:
      'https://firebasestorage.googleapis.com/v0/b/meet-force.appspot.com/o/userAvatar%2FYQsYKfuIuadn1fzSzq9M7pLIXNu2?alt=media&token=0029739c-8350-47b5-8658-7e62ff26e61e',
    Hermina:
      'https://firebasestorage.googleapis.com/v0/b/meet-force.appspot.com/o/userAvatar%2FiGdCaWDf1QdYj3lBwvUzTMpZUSV2?alt=media&token=d82a5460-341f-4ac1-867a-2230f022bcf0',
  };

  const MouseEnterHandler = (e) => {
    setMouseState(true);
    setTargetName(e.target.name);
  };
  const MouseLeaveHandler = (e) => {
    setMouseState(false);
  };

  return (
    <div className='event-details-container'>
      <p className='event-details-text'>{eventInfo?.description}</p>
      <div className='event-details-extra-content-container'>
        <div className='event-details-tag-container'>
          <p className='event-details-tag-text'>Tags</p>
          <span className='event-details-tags'>{eventInfo?.type}</span>
          <span className='event-details-tags'>{eventInfo?.category}</span>
        </div>

        <div className='event-details-useravatar-conatiner'>
          <p>Attendees</p>
          <div className='event-details-useravatar-text'>
            {mouseState ? targetName : null}
          </div>

          {attendeesNm &&
            attendeesNm.map((key) => {
              console.log(key);
              if (Object.keys(userAvatar).includes(key)) {
                while (
                  key === attendeesNm[0] ||
                  key === attendeesNm[1] ||
                  key === attendeesNm[2] ||
                  key === attendeesNm[3] ||
                  key === attendeesNm[4]
                ) {
                  return (
                    <>
                      <img
                        className='event-details-useravatar'
                        onMouseEnter={MouseEnterHandler}
                        onMouseLeave={MouseLeaveHandler}
                        name={key}
                        src={
                          userAvatar[key]
                            ? userAvatar[key]
                            : 'https://firebasestorage.googleapis.com/v0/b/meet-force.appspot.com/o/userAvatar%2F6tSUU7lLnkPHhdDCGLKGT3YSSs13?alt=media&token=661f41be-46d8-4355-b6f1-c1fd72b530a8'
                        }
                      ></img>
                    </>
                  );
                }
              }
            })}
          {attendeesNm[4] ? <span>...</span> : null}
        </div>
      </div>
    </div>
  );
};
export default EventDetails;
