using FlashcardFight.Models;
using FlashcardFight.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FlashcardFight.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserProfileController : ControllerBase
    {

            private readonly IUserProfileRepository _userProfileRepository;
            public UserProfileController(IUserProfileRepository userProfileRepository)
            {
                _userProfileRepository = userProfileRepository;
            }

            [HttpGet("{firebaseUserId}")]
            public IActionResult GetUserProfile(string firebaseUserId)
            {
                var profile = _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
                return Ok(profile);
            }

            [HttpPost]
            public IActionResult Post(UserProfile userProfile)
            {
                userProfile.JoinDate = DateTime.Now;
                userProfile.UserTypeId = 1;
                userProfile.Level = 1;
                userProfile.Experience = 0;
                userProfile.HP = 500;
                userProfile.CharacterImageId = 1;
                userProfile.Attempts = 0;
                userProfile.Wins = 0;
                _userProfileRepository.Add(userProfile);
                return CreatedAtAction(
                    nameof(GetUserProfile),
                    new { firebaseUserId = userProfile.FirebaseUserId },
                    userProfile);
            }
    }
}
