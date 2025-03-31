import { supabase } from '../config/supabase';

export const authService = {
  // Login function
  async login(email, password) {
    // Query the employees table
    const { data, error } = await supabase
      .from('employees')
      .select()
      .eq('email', email)
      .eq('password', password)
      .single();

    if (error) {
      throw new Error('Invalid email or password');
    }

    if (!data) {
      throw new Error('User not found');
    }

    // Update online status
    await supabase
      .from('employees')
      .update({ online: true })
      .eq('id', data.id);

    return { employee: data };
  },

  // Logout function
  async logout(userId) {
    if (!userId) return;

    // Update online status
    await supabase
      .from('employees')
      .update({ online: false })
      .eq('id', userId);

    return true;
  }
}; 