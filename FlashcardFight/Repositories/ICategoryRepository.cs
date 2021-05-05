using FlashcardFight.Models;
using System.Collections.Generic;

namespace FlashcardFight.Repositories
{
    public interface ICategoryRepository
    {
        void AddCategory(Category category);
        void DeleteCategory(Category category);
        List<Category> GetAll();
        Category GetById(int id);
        void UpdateCategory(Category category);
    }
}