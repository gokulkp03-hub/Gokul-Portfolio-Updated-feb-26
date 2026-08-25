import re

with open("server/routers.ts", "r") as f:
    content = f.read()

# Replace clearCookie with setHeader
old_logout = """    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });"""
      
new_logout = """    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      const isSecure = cookieOptions.secure ? 'Secure;' : '';
      const sameSite = cookieOptions.sameSite ? `SameSite=${cookieOptions.sameSite};` : '';
      ctx.res.setHeader('Set-Cookie', `${COOKIE_NAME}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; ${isSecure} ${sameSite}`);"""
      
content = content.replace(old_logout, new_logout)

with open("server/routers.ts", "w") as f:
    f.write(content)
