/* تطبيق المزارعين — إعدادات المزامنة السحابية (Supabase)
   هذا الملف يُقرأ قبل سكربت التطبيق. إن لم يوجد، يستخدم التطبيق
   نفس القيم المضمّنة داخله كاحتياطي (انظر index.html).
   المفتاح هنا هو المفتاح العام anon (مخصّص للواجهة) وليس مفتاح service_role —
   لا تضع مفتاح service_role أبدًا في أي ملف واجهة. */
window.MZR_CONFIG = {
  supabaseUrl: "https://pgdvetwwwvzhczruzixu.supabase.co",
  supabaseAnonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBnZHZldHd3d3Z6aGN6cnV6aXh1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTU3NDI5MDMsImV4cCI6MjExMTMxODkwM30.fFAhHkIm_EKPNZrdOb-yEbtvr7hwy0wXf4aacod-kTQ"
};
