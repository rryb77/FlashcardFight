using FlashcardFight.Models;
using System.Collections.Generic;

namespace FlashcardFight.Repositories
{
    public interface ICategoryRepository
    {
        void AddCategory(Category category);
        void DeleteCategory(int id);
        List<Category> GetAll();
        Category GetById(int id);
        void UpdateCategory(Category category);
    }
}