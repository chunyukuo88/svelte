export const logout = async ({ locals }) => {
    const { error } = await locals.sb.auth.signOut();
    if (error) {
        throw error(500, 'Something broke while trying to logout.');
    }
}