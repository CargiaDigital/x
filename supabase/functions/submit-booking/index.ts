import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const body = await req.json();

    // Required fields
    const required = [
      "name", "phone", "city", "vehicle_year", "vehicle_make",
      "vehicle_model", "package", "price", "property_type",
      "address", "appointment_date", "appointment_time",
    ];
    for (const field of required) {
      if (!body[field] || String(body[field]).trim() === "") {
        return new Response(
          JSON.stringify({ success: false, error: `Missing required field: ${field}` }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }
    }

    // 1. Save to Supabase
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const insertPayload = {
      name: body.name,
      phone: body.phone,
      city: body.city,
      vehicle_year: body.vehicle_year,
      vehicle_make: body.vehicle_make,
      vehicle_model: body.vehicle_model,
      package: body.package,
      price: body.price,
      property_type: body.property_type,
      address: body.address,
      appointment_date: body.appointment_date,
      appointment_time: body.appointment_time,
      comments: body.comments ?? null,
    };

    const { error: insertError } = await supabase
      .from("bookings")
      .insert(insertPayload);

    if (insertError) {
      return new Response(
        JSON.stringify({ success: false, error: "Failed to save booking to database." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    // 2. Send SMS via Twilio
    const accountSid = Deno.env.get("TWILIO_ACCOUNT_SID");
    const authToken = Deno.env.get("TWILIO_AUTH_TOKEN");
    const fromNumber = Deno.env.get("TWILIO_FROM_NUMBER");
    const toNumber = Deno.env.get("TO_NUMBER");

    if (!accountSid || !authToken || !fromNumber || !toNumber) {
      // Booking saved, but SMS not sent — still return success since data is saved
      return new Response(
        JSON.stringify({ success: true, sms_sent: false, error: "Twilio credentials not configured." }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const vehicle = `${body.vehicle_year} ${body.vehicle_make} ${body.vehicle_model}`;
    const dateFormatted = new Date(body.appointment_date + "T00:00:00").toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });

    const smsBody =
      `🚨 NEW BOOKING 🚨\n` +
      `------------------------\n` +
      `👤 Customer: ${body.name}\n` +
      `📞 Phone: ${body.phone}\n` +
      `📍 City: ${body.city}\n` +
      `🚗 Vehicle: ${vehicle}\n` +
      `📦 Package: ${body.package}\n` +
      `💰 Price: ${body.price}\n` +
      `🏠 Type: ${body.property_type}\n` +
      `🗺️ Address: ${body.address}\n` +
      `📅 Date: ${dateFormatted}\n` +
      `⏰ Time: ${body.appointment_time}\n` +
      `💬 Comments: ${body.comments || "None"}\n` +
      `------------------------\n` +
      `Automated Alert.`;

    const twilioUrl = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;
    const authHeader = "Basic " + btoa(`${accountSid}:${authToken}`);

    const twilioResponse = await fetch(twilioUrl, {
      method: "POST",
      headers: {
        "Authorization": authHeader,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        From: fromNumber,
        To: toNumber,
        Body: smsBody,
      }),
    });

    if (!twilioResponse.ok) {
      const twilioError = await twilioResponse.text();
      console.error("Twilio SMS failed:", twilioError);
      // Booking was saved successfully — still return success
      return new Response(
        JSON.stringify({ success: true, sms_sent: false, error: "Booking saved but SMS delivery failed." }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    return new Response(
      JSON.stringify({ success: true, sms_sent: true }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    console.error("Edge function error:", err);
    return new Response(
      JSON.stringify({ success: false, error: "An unexpected error occurred." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
